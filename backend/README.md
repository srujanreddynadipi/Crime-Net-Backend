# CrimeNet Backend

Spring Boot backend for CrimeNet civic safety platform using Firebase Firestore as database.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Firebase project with Firestore enabled
- Firebase service account key

## Setup

### 1. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database (Native mode)
3. Enable Authentication
4. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file as `firebase-adminsdk.json`
5. Place `firebase-adminsdk.json` in `src/main/resources/`

**Important:** Never commit `firebase-adminsdk.json` to version control!

### 2. Firebase Authentication Setup

Users authenticate with Firebase on the frontend. The backend verifies ID tokens.

To set custom claims (roles) for users:

```javascript
// Using Firebase Admin SDK (Node.js script or Cloud Function)
admin.auth().setCustomUserClaims(uid, { role: 'CITIZEN' })
```

Supported roles: `CITIZEN`, `POLICE`, `ADMIN`

### 3. Build and Run

```bash
# Build
mvn clean install

# Run
mvn spring-boot:run
```

Server starts on `http://localhost:8080`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user (public)
- `POST /api/auth/verify` - Verify Firebase token (public)

### Reports

- `POST /api/reports` - Create crime report
- `GET /api/reports/{id}` - Get report details
- `GET /api/reports/user/{userId}` - Get user's reports
- `GET /api/reports/status/{status}` - Get reports by status (police/admin)
- `PUT /api/reports/{id}/assign` - Assign officer (police/admin)
- `PUT /api/reports/{id}/status` - Update status (police/admin)
- `GET /api/reports/{id}/timeline` - Get report timeline

### Anonymous Tips

- `POST /api/tips` - Submit anonymous tip (public)
- `GET /api/tips/track/{code}` - Track tip by code (public)
- `GET /api/tips` - Get all tips (police/admin)

### SOS Alerts

- `POST /api/sos/trigger` - Trigger SOS alert
- `PUT /api/sos/{id}/status` - Update SOS status (police/admin)

### Notifications

- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/{id}/read` - Mark as read

## Authentication

All protected endpoints require Firebase ID token in Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

Frontend should:
1. Authenticate user with Firebase Auth
2. Get ID token: `await user.getIdToken()`
3. Send token in requests

## Firestore Structure

```
users/
  {uid}/
    fullName, email, phone, role, address, ...

reports/
  {reportId}/
    userId, title, description, status, ...
    timelines/
      {timelineId}/
    attachments/
      {attachmentId}/

tips/
  {tipId}/
    title, description, trackingCode, ...

sos_alerts/
  {sosId}/
    userId, latitude, longitude, status, ...
```

## Deployment Options (Free Tier)

### Railway.app
1. Connect GitHub repo
2. Add `GOOGLE_APPLICATION_CREDENTIALS_JSON` environment variable (paste JSON content)
3. Deploy

### Render.com
1. Create Web Service from GitHub
2. Build: `mvn clean package`
3. Start: `java -jar target/crimenet-backend-0.0.1-SNAPSHOT.jar`
4. Add environment variable for Firebase credentials

### Fly.io
```bash
fly launch
fly secrets set GOOGLE_APPLICATION_CREDENTIALS_JSON="$(cat firebase-adminsdk.json)"
fly deploy
```

## Development

### Project Structure

```
src/main/java/com/crimenet/
├── config/          - Spring configuration
├── controller/      - REST controllers
├── dto/             - Request/response objects
├── exception/       - Custom exceptions
├── model/           - Entity models
├── repository/      - Firestore repositories
├── security/        - Authentication & authorization
└── service/         - Business logic
```

### Testing

```bash
mvn test
```

## Environment Variables

- `GOOGLE_APPLICATION_CREDENTIALS` - Path to service account key (optional, defaults to classpath)
- `SERVER_PORT` - Server port (default: 8080)

## Security Notes

- All passwords are hashed by Firebase Auth
- ID tokens are verified on every request
- Role-based access control via Spring Security
- CORS configured for frontend origin only
- Stateless session management

## Support

For issues or questions, please create an issue in the repository.
