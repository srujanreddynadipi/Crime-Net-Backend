# 🔌 CrimeNet API Integration Reference

Quick reference for all integrated API endpoints in the user dashboard.

## 📊 Statistics & Dashboard

### Quick Stats
- **Component**: `QuickStatsAPI.jsx`
- **Endpoint**: `GET /api/reports/user/{userId}`
- **Purpose**: Calculate active cases, resolved cases, community points, safety score

## 👤 User Profile

### Get User Profile
- **Component**: `UserProfile.jsx`
- **Endpoint**: `GET /api/users/{uid}`
- **Returns**: User details (fullName, email, phone, address, role)

### Update User Profile
- **Component**: `UserProfile.jsx`
- **Endpoint**: `PUT /api/users/{uid}`
- **Body**: `{ fullName, phone, address, languagePreference }`

## 🚨 Crime Reports

### Create Report
- **Component**: `ReportCrimeAPI.jsx`
- **Endpoint**: `POST /api/reports`
- **Body**: 
```json
{
  "title": "string",
  "description": "string",
  "category": "THEFT|ASSAULT|ROBBERY|...",
  "priority": "LOW|MEDIUM|HIGH|CRITICAL",
  "location": "string",
  "latitude": number,
  "longitude": number,
  "incidentAt": "ISO date string",
  "isAnonymous": boolean
}
```
- **Returns**: Created report with `reportId` and `caseNumber`

### Get User's Reports
- **Component**: `MyCasesAPI.jsx`
- **Endpoint**: `GET /api/reports/user/{userId}`
- **Returns**: Array of user's reports

### Get All Reports
- **Components**: `MissingPersonsAPI.jsx`, `SafetyAlertsAPI.jsx`
- **Endpoint**: `GET /api/reports`
- **Returns**: All reports (filtered client-side by category/severity)

### Get Report Timeline
- **Component**: `MyCasesAPI.jsx`
- **Endpoint**: `GET /api/reports/{reportId}/timeline`
- **Returns**: Array of timeline events (status changes, notes)

## 💬 Chat & Messaging

### Get User Conversations
- **Component**: `ChatModuleAPI.jsx`
- **Endpoint**: `GET /api/chat/conversations`
- **Returns**: Array of conversations with participants, last message time

### Get Conversation Messages
- **Component**: `ChatModuleAPI.jsx`
- **Endpoint**: `GET /api/chat/conversations/{conversationId}/messages`
- **Returns**: Array of messages with sender, content, timestamps

### Send Message
- **Component**: `ChatModuleAPI.jsx`
- **Endpoint**: `POST /api/chat/conversations/{conversationId}/messages`
- **Body**: 
```json
{
  "content": "string",
  "mediaUrl": "string (optional)",
  "type": "TEXT|IMAGE|VIDEO|AUDIO"
}
```

### Mark Message as Read
- **Component**: `ChatModuleAPI.jsx`
- **Endpoint**: `PUT /api/chat/conversations/{conversationId}/messages/{messageId}/read`
- **Purpose**: Update read status and timestamp

## 🔔 Notifications (Pending Implementation)

### Get User Notifications
- **Endpoint**: `GET /api/notifications`
- **Returns**: Array of notifications with read status

### Mark Notification as Read
- **Endpoint**: `PUT /api/notifications/{notificationId}/read`

## 🆘 SOS Alerts (Pending Implementation)

### Trigger SOS Alert
- **Endpoint**: `POST /api/sos/trigger`
- **Body**:
```json
{
  "latitude": number,
  "longitude": number,
  "address": "string",
  "accuracy": number,
  "severity": "LOW|MEDIUM|HIGH|CRITICAL"
}
```

### Update SOS Status (Police/Admin)
- **Endpoint**: `PUT /api/sos/{sosId}/status`
- **Body**: `{ "status": "ACTIVE|RESOLVED|CANCELLED" }`

## 📋 Tips (Pending Implementation)

### Submit Anonymous Tip
- **Endpoint**: `POST /api/tips`
- **Body**:
```json
{
  "description": "string",
  "category": "string",
  "location": "string",
  "priority": "LOW|MEDIUM|HIGH|CRITICAL",
  "latitude": number,
  "longitude": number
}
```
- **Returns**: Tip with `trackingCode` for anonymous users

### Get Tip by Tracking Code
- **Endpoint**: `GET /api/tips/track/{trackingCode}`
- **Purpose**: Allow anonymous users to check tip status

## 📊 Analytics (Pending Implementation)

### Get System Statistics
- **Endpoint**: `GET /api/analytics/statistics`
- **Returns**: Overall system stats (total reports, users, tips, active SOS)

### Get Reports by Category
- **Endpoint**: `GET /api/analytics/reports/by-category`
- **Returns**: Array of `{ category, count }` for chart visualization

### Get Report Trends
- **Endpoint**: `GET /api/analytics/trends`
- **Returns**: Time-series data for trend charts

## ⭐ Feedback (Pending Implementation)

### Submit Feedback
- **Endpoint**: `POST /api/feedback`
- **Body**:
```json
{
  "reportId": "string",
  "officerId": "string",
  "rating": number (1-5),
  "comment": "string",
  "category": "SERVICE|RESPONSE_TIME|PROFESSIONALISM|..."
}
```

### Get Officer Ratings
- **Endpoint**: `GET /api/feedback/officer/{officerId}`
- **Returns**: Average rating and feedback list

---

## 🔐 Authentication

All API calls automatically include the Firebase ID token in the `Authorization` header:
```
Authorization: Bearer <firebase-id-token>
```

This is handled by the Axios interceptor in `src/api/client.ts`.

---

## 🌐 Base URL

- **Development**: `http://localhost:8080`
- **Production**: TBD

Set in `src/api/client.ts`:
```typescript
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});
```

---

## 📝 Request/Response Format

### Standard Success Response
```json
{
  "data": { ... },
  "status": 200
}
```

### Standard Error Response
```json
{
  "error": "Error message",
  "status": 400|401|403|404|500
}
```

---

## 🔄 Polling Intervals

- **Chat Messages**: Every 5 seconds
- **Notifications**: TBD
- **SOS Alerts**: TBD (should be real-time via WebSocket in production)

---

## ✅ Status Codes

- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🎯 Quick Reference: Component → Endpoints

| Component | Endpoints Used |
|-----------|----------------|
| `QuickStatsAPI` | `GET /api/reports/user/{userId}` |
| `UserProfile` | `GET /api/users/{uid}`, `PUT /api/users/{uid}` |
| `ReportCrimeAPI` | `POST /api/reports` |
| `MyCasesAPI` | `GET /api/reports/user/{userId}`, `GET /api/reports/{id}/timeline` |
| `ChatModuleAPI` | `GET /api/chat/conversations`, `GET /api/chat/conversations/{id}/messages`, `POST /api/chat/conversations/{id}/messages`, `PUT /api/chat/conversations/{id}/messages/{msgId}/read` |
| `MissingPersonsAPI` | `GET /api/reports` (filtered by category) |
| `SafetyAlertsAPI` | `GET /api/reports` (filtered by severity) |

---

## 🔧 TypeScript Interfaces

All interfaces are defined in:
- `src/api/users.ts` - User, UpdateUserRequest
- `src/api/reports.ts` - CrimeReport, CreateReportRequest, ReportTimeline
- `src/api/chat.ts` - Conversation, ChatMessage, SendMessageRequest
- `src/api/notifications.ts` - Notification
- `src/api/sos.ts` - SOSAlert, TriggerSOSRequest
- `src/api/tips.ts` - Tip, CreateTipRequest
- `src/api/analytics.ts` - Statistics, CategoryData
- `src/api/feedback.ts` - Feedback, CreateFeedbackRequest

---

**Last Updated**: Phase 2 Completion
**Status**: 12+ endpoints integrated, 7 major components functional ✅
