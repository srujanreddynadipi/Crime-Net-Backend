# 🧠 CrimeNet Backend Generation Prompt — for GitHub Copilot Chat

> **Purpose:**  
> Use this prompt in **GitHub Copilot Chat** (in VS Code or JetBrains) to generate the complete backend of **CrimeNet**, a real-time citizen–police crime reporting and analytics platform built using **Java Spring Boot**.

---

## ⚙️ OVERVIEW

Copilot, you are an **expert backend engineer**.  
Generate a **production-grade, modular, and secure backend system** for the project **CrimeNet** using **Spring Boot, Spring Security, JPA, WebSocket, Firebase, JWT, and Swagger**.

You will:
- Create all models, repositories, services, and controllers.
- Implement REST APIs with CRUD operations.
- Configure JWT authentication and role-based access control.
- Integrate WebSocket for real-time chat and notifications.
- Include database schema, entity relationships, and DTOs.
- Add analytical and predictive modules.
- Structure project with scalability and maintainability in mind.

---

## 🧩 PROJECT STRUCTURE

```
com.crimenet
 ├── controller
 ├── service
 ├── repository
 ├── model
 ├── dto
 ├── config
 ├── security
 ├── utils
 └── CrimeNetApplication.java
```

---

## 🧱 CORE ENTITIES (Tables + Variables)

### User
- user_id (Long, PK)
- full_name (String)
- email (String, unique)
- password (String, encrypted)
- phone (String)
- role (ENUM: CITIZEN, POLICE, ADMIN)
- address (String)
- language_preference (String)

### Officer
- officer_id (Long, PK)
- name (String)
- station_name (String)
- designation (String)
- contact (String)
- area_assigned (String)

### CrimeReport
- report_id (Long, PK)
- user_id (FK → User)
- assigned_officer_id (FK → Officer)
- title (String)
- description (Text)
- location (String)
- latitude, longitude (Double)
- media_url (String)
- status (ENUM: PENDING, UNDER_INVESTIGATION, CLOSED)
- created_at, updated_at (Timestamp)

### ChatMessage
- message_id (Long, PK)
- sender_id (FK → User/Officer)
- receiver_id (FK → User/Officer)
- content (String)
- media_url (String)
- timestamp (Timestamp)
- type (ENUM: TEXT, AUDIO, VIDEO)

### Notification
- notification_id (Long, PK)
- user_id (FK → User)
- message (String)
- type (ENUM: STATUS_UPDATE, ALERT, REMINDER)
- is_read (Boolean)
- created_at (Timestamp)

### Feedback
- feedback_id (Long, PK)
- user_id (FK → User)
- officer_id (FK → Officer)
- rating (Integer)
- comment (String)
- created_at (Timestamp)

### AnonymousTip
- tip_id (Long, PK)
- title (String)
- description (Text)
- location (String)
- status (ENUM: RECEIVED, VERIFIED, ACTIONED)
- tracking_code (String)
- created_at (Timestamp)

### MissingPerson
- case_id (Long, PK)
- name (String)
- age (Integer)
- gender (String)
- last_seen_location (String)
- photo_url (String)
- status (ENUM: OPEN, FOUND)
- reported_by (FK → User/Officer)

### StolenItem
- item_id (Long, PK)
- item_type (String)
- description (String)
- serial_number (String)
- status (ENUM: LOST, RECOVERED)
- location (String)
- reported_by (FK → User/Officer)

### SOSAlert
- sos_id (Long, PK)
- user_id (FK → User)
- latitude, longitude (Double)
- media_stream_url (String)
- triggered_at (Timestamp)
- status (ENUM: ACTIVE, HANDLED)

---

## 🧠 SERVICE LAYER RESPONSIBILITIES

- **UserService:** manage registration, authentication, profile CRUD.
- **ReportService:** handle report creation, assignment, status updates.
- **ChatService:** store, retrieve, and stream live chats.
- **NotificationService:** send push updates, FCM integration.
- **FeedbackService:** manage officer ratings and comments.
- **AnalyticsService:** aggregate crime data, generate statistics.
- **AuthService:** JWT-based authentication and authorization.

---

## 🌐 CONTROLLER ENDPOINTS

### UserController
- POST `/api/users/register`
- POST `/api/users/login`
- GET `/api/users/{id}`
- PUT `/api/users/{id}`
- DELETE `/api/users/{id}`

### ReportController
- POST `/api/reports`
- GET `/api/reports`
- GET `/api/reports/{id}`
- PUT `/api/reports/{id}`
- DELETE `/api/reports/{id}`
- GET `/api/reports/user/{userId}`
- PUT `/api/reports/{id}/assign/{officerId}`

### ChatController
- WebSocket endpoint `/ws/chat`
- POST `/api/chat/send`
- GET `/api/chat/conversation/{user1}/{user2}`

### NotificationController
- GET `/api/notifications/{userId}`
- PUT `/api/notifications/read/{id}`

### FeedbackController
- POST `/api/feedback`
- GET `/api/feedback/officer/{id}`

### TipController
- POST `/api/tips`
- GET `/api/tips/track/{trackingCode}`

### SOSController
- POST `/api/sos/trigger`
- PUT `/api/sos/updateStatus/{id}`

### AnalyticsController
- GET `/api/analytics/hotspots`
- GET `/api/analytics/statistics`
- GET `/api/analytics/response-time`

---

## 🔒 SECURITY

- Implement JWT-based authentication.
- Password encryption using BCrypt.
- Role-based authorization with `@PreAuthorize`.
- Citizens: limited to their own data.
- Officers/Admins: extended access rights.

---

## 📡 REAL-TIME FEATURES

- WebSocket for live chat and report updates.
- Firebase Cloud Messaging (FCM) for push alerts.
- SOS alert → triggers location-based officer notifications.

---

## 🧠 ADVANCED MODULES

- Predictive policing (AI/ML module integration placeholder).
- PostGIS or spatial queries for location-based search.
- NLP-based priority detection for urgent cases.
- Officer performance analytics dashboard.

---

## 🧾 GOVERNMENT & PUBLIC INTEGRATIONS

- Integrate CCTNS / NCRB / eGovernance APIs (mock endpoints).
- Public bulletin board for missing/stolen items.
- QR codes for incident tagging.

---

## ⚙️ SYSTEM FEATURES

- Redis caching for fast queries.
- AWS S3 / Local storage for media uploads.
- Scheduler for cleanup and reminders.
- Audit logging (action, user, timestamp, IP).
- Swagger/OpenAPI docs for all endpoints.
- Spring Actuator for health checks.

---

## 🧪 TESTING & DEPLOYMENT

- Use JUnit + Mockito for unit tests.
- Testcontainers for integration tests.
- SLF4J + Logback for structured logging.
- Dockerfile for containerization.

---

## 🪪 ADDITIONAL IDEAS

- Blockchain-based evidence verification (future-ready).
- Offline sync support.
- Voice-to-text for reports.
- Citizen & officer reputation scores.
- Case timeline entity for stage tracking.

---

## 📈 OUTPUT EXPECTATIONS

Generate:
- Java files for models, repositories, services, controllers.
- Configuration files (Security, WebSocket, Firebase, etc.).
- Example data.sql for dummy records.
- Swagger documentation ready to run.
- Fully runnable Spring Boot backend with APIs, JWT, FCM, WebSocket.

---

**Goal:**  
Deliver a secure, modular, scalable, intelligent backend system with all CRUD APIs, analytics, chat, notifications, SOS, feedback, predictive policing, and integration-ready architecture — fully implemented in Java Spring Boot.
