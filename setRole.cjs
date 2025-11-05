// Helper script to seed/update a user's role and profile in Firebase Auth and Firestore
// Usage (PowerShell):
//   $env:FIREBASE_CONFIG_JSON = '<paste service account JSON>'
//   node backend/setRole.cjs <uid> <role> [email] [password] [fullName]
// OR using a credentials file path:
//   $env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\\path\\to\\serviceAccount.json'
//   node backend/setRole.cjs <uid> <role> [email] [password] [fullName]

const admin = require('firebase-admin');

function initAdmin() {
  const inline = process.env.FIREBASE_CONFIG_JSON;
  if (inline && inline.trim().length > 0) {
    const creds = JSON.parse(inline);
    admin.initializeApp({ credential: admin.credential.cert(creds) });
  } else {
    // Requires GOOGLE_APPLICATION_CREDENTIALS to be set to a JSON file path
    admin.initializeApp();
  }
}

async function ensureAuthUser({ uid, email, password }) {
  try {
    const user = await admin.auth().getUser(uid);
    const updates = {};
    if (email && user.email !== email) updates.email = email;
    if (password) updates.password = password;
    if (Object.keys(updates).length > 0) {
      updates.emailVerified = true;
      await admin.auth().updateUser(uid, updates);
      return await admin.auth().getUser(uid);
    }
    return user;
  } catch (err) {
    if (err && err.code === 'auth/user-not-found') {
      const payload = { uid };
      if (email) payload.email = email;
      if (password) payload.password = password;
      payload.emailVerified = true;
      return await admin.auth().createUser(payload);
    }
    throw err;
  }
}

async function setCustomRole(uid, role) {
  await admin.auth().setCustomUserClaims(uid, { role });
}

async function upsertFirestoreUser({ uid, email, role, fullName }) {
  const db = admin.firestore();
  const ref = db.collection('users').doc(uid);
  const data = {
    role: role || 'CITIZEN',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };
  if (email) data.email = email;
  if (fullName) data.fullName = fullName;
  await ref.set(data, { merge: true });
}

async function main() {
  const [uid, role, email, password, fullName] = process.argv.slice(2);
  if (!uid || !role) {
    console.error('Usage: node backend/setRole.cjs <uid> <role> [email] [password] [fullName]');
    process.exit(1);
  }

  initAdmin();

  try {
    const user = await ensureAuthUser({ uid, email, password });
    await setCustomRole(uid, role);
    await upsertFirestoreUser({ uid, email: email || user.email, role, fullName });
    console.log(`Success: uid=${uid}, role=${role}, email=${email || user.email}`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
