package com.crimenet.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            InputStream serviceAccount = null;

            // 1) Prefer inline JSON via env var (best for Render)
            String inlineJson = firstNonBlank(
                    System.getenv("FIREBASE_CONFIG_JSON"),
                    System.getenv("FIREBASE_SERVICE_ACCOUNT_JSON") // allow alternate var name
            );
            if (inlineJson != null) {
                serviceAccount = new ByteArrayInputStream(inlineJson.getBytes(StandardCharsets.UTF_8));
            }

            // 1b) Build JSON from individual env vars to avoid escaping issues
            if (serviceAccount == null) {
                String projectId = System.getenv("FIREBASE_PROJECT_ID");
                String privateKeyId = System.getenv("FIREBASE_PRIVATE_KEY_ID");
                String privateKey = System.getenv("FIREBASE_PRIVATE_KEY");
                String clientEmail = System.getenv("FIREBASE_CLIENT_EMAIL");
                String clientId = System.getenv("FIREBASE_CLIENT_ID");
                String authUri = System.getenv("FIREBASE_AUTH_URI");
                String tokenUri = System.getenv("FIREBASE_TOKEN_URI");
                String authProviderCertUrl = System.getenv("FIREBASE_AUTH_PROVIDER_X509_CERT_URL");
                String clientCertUrl = System.getenv("FIREBASE_CLIENT_X509_CERT_URL");
                String universeDomain = firstNonBlank(System.getenv("FIREBASE_UNIVERSE_DOMAIN"), "googleapis.com");

                // Normalize private key: allow either literal \n or real newlines
                if (privateKey != null) {
                    privateKey = privateKey.replace("\\n", "\n");
                }

                // Minimum required fields: projectId, privateKey, clientEmail
                if (isNotBlank(projectId) && isNotBlank(privateKey) && isNotBlank(clientEmail)) {
                    Map<String, String> payload = new HashMap<>();
                    payload.put("type", "service_account");
                    payload.put("project_id", projectId);
                    if (isNotBlank(privateKeyId)) payload.put("private_key_id", privateKeyId);
                    payload.put("private_key", privateKey);
                    payload.put("client_email", clientEmail);
                    if (isNotBlank(clientId)) payload.put("client_id", clientId);
                    if (isNotBlank(authUri)) payload.put("auth_uri", authUri);
                    if (isNotBlank(tokenUri)) payload.put("token_uri", tokenUri);
                    if (isNotBlank(authProviderCertUrl)) payload.put("auth_provider_x509_cert_url", authProviderCertUrl);
                    if (isNotBlank(clientCertUrl)) payload.put("client_x509_cert_url", clientCertUrl);
                    if (isNotBlank(universeDomain)) payload.put("universe_domain", universeDomain);

                    byte[] jsonBytes = new ObjectMapper().writeValueAsBytes(payload);
                    serviceAccount = new ByteArrayInputStream(jsonBytes);
                }
            }

            // 2) Otherwise try GOOGLE_APPLICATION_CREDENTIALS file path
            if (serviceAccount == null) {
                String credsPath = System.getenv("GOOGLE_APPLICATION_CREDENTIALS");
                if (credsPath != null && !credsPath.isBlank()) {
                    File f = new File(credsPath);
                    if (f.exists()) {
                        serviceAccount = new FileInputStream(f);
                    }
                }
            }

            // 3) Fallback: classpath resource (for local dev)
            if (serviceAccount == null) {
                serviceAccount = getClass()
                        .getClassLoader()
                        .getResourceAsStream("crime-net-12f88-firebase-adminsdk-fbsvc-0f2e4a5d71.json");
            }

            if (serviceAccount == null) {
                throw new IOException("Firebase credentials not found. Provide FIREBASE_CONFIG_JSON env var, " +
                        "or set GOOGLE_APPLICATION_CREDENTIALS to a readable file path, " +
                        "or place the service account JSON on the classpath.");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            return FirebaseApp.initializeApp(options);
        }
        return FirebaseApp.getInstance();
    }

    @Bean
    public Firestore firestore(FirebaseApp firebaseApp) {
        return FirestoreClient.getFirestore(firebaseApp);
    }

    // Helpers
    private static boolean isNotBlank(String s) {
        return s != null && !s.isBlank();
    }

    private static String firstNonBlank(String... values) {
        if (values == null) return null;
        for (String v : values) {
            if (v != null && !v.isBlank()) return v;
        }
        return null;
    }
}

