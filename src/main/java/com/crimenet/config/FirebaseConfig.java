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

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            InputStream serviceAccount = null;

            // 1) Prefer inline JSON via env var (best for Render)
            String inlineJson = System.getenv("FIREBASE_CONFIG_JSON");
            if (inlineJson != null && !inlineJson.isBlank()) {
                serviceAccount = new ByteArrayInputStream(inlineJson.getBytes(StandardCharsets.UTF_8));
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
}
