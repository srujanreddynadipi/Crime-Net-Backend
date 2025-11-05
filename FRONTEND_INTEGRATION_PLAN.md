# 🚀 CrimeNet Frontend-Backend Integration Plan

## 📋 EXECUTIVE SUMMARY

**Status:** Awaiting approval before implementation  
**Estimated Duration:** 3-4 days (phased rollout)  
**Tech Stack Decisions:** Material-UI (MUI) + Recharts + Firebase Auth + Axios  
**Scope:** All 60+ backend endpoints integrated into React frontend

---

## ✅ CONFIRMED DECISIONS (Based on your answers)

### Infrastructure
- ✅ Backend API Base URL: `http://localhost:8080` (development)
- ✅ Frontend Dev URL: `http://localhost:5173` (Vite default)
- ✅ CORS: Will verify and fix if needed in `WebConfig.java`
- ✅ Database: Firebase Firestore (already configured)
- ✅ Authentication: **PENDING YOUR CONFIRMATION** (Firebase Auth recommended)

### Libraries & Frameworks
- ✅ **UI Library:** Material-UI (MUI v5) - Industry standard, excellent TypeScript support, comprehensive components
- ✅ **Charts:** Recharts - React-native, responsive, free, perfect for your analytics needs
- ✅ **HTTP Client:** Axios - Better than fetch, interceptors for auth, automatic retries
- ✅ **State Management:** React Context + React Query - Simple, no Redux overhead
- ✅ **Real-time Chat:** Firestore listeners - Free tier supports 50K reads/day, perfect for chat
- ✅ **Maps:** Google Maps (if free quota allows) or fallback to Leaflet (100% free, OSM-based)
- ✅ **Geolocation:** Browser Geolocation API (free, built-in)
- ✅ **Push Notifications:** FCM Web Push (free) - Will implement if VAPID key available

### Scope for v1
- ✅ All crime reporting features
- ✅ Anonymous tips with tracking
- ✅ SOS alert system
- ✅ Chat & conversations
- ✅ Analytics dashboards
- ✅ Feedback/ratings system
- ✅ **Missing Persons pages** (browse, details, search)
- ✅ **Stolen Items pages** (browse, details, search)
- ❌ File uploads (deferred to v2)
- ❌ OTP login (deferred to future)
- ❌ Email verification UI (deferred to future)

---

## 🎯 INTEGRATION PHASES (Detailed Breakdown)

### **Phase 0: Prerequisites & Setup** (Day 1 Morning)
**Duration:** 2-3 hours  
**Deliverables:**
1. Environment configuration
   - Create `.env` file:
     ```env
     VITE_API_BASE_URL=http://localhost:8080
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=crime-net-12f88.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=crime-net-12f88
     VITE_FIREBASE_STORAGE_BUCKET=crime-net-12f88.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     VITE_GOOGLE_MAPS_API_KEY=optional_for_later
     ```

2. Install dependencies:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   npm install axios react-query
   npm install recharts
   npm install firebase
   npm install react-router-dom@7  # Already installed
   npm install leaflet react-leaflet  # Free maps fallback
   ```

3. Project structure:
   ```
   src/
   ├── api/
   │   ├── client.js          # Axios instance with interceptors
   │   ├── auth.js            # Auth endpoints
   │   ├── users.js           # User endpoints
   │   ├── reports.js         # Crime report endpoints
   │   ├── tips.js            # Anonymous tips
   │   ├── notifications.js   # Notifications
   │   ├── sos.js             # SOS alerts
   │   ├── chat.js            # Chat & conversations
   │   ├── analytics.js       # Analytics
   │   ├── feedback.js        # Feedback system
   │   ├── missing.js         # Missing persons
   │   └── stolen.js          # Stolen items
   ├── contexts/
   │   ├── AuthContext.jsx    # Firebase Auth + user state
   │   └── NotificationContext.jsx  # In-app notifications
   ├── components/
   │   ├── common/            # Reusable components
   │   ├── reports/           # Report-specific components
   │   ├── chat/              # Chat UI components
   │   └── analytics/         # Chart components
   ├── pages/
   │   ├── citizen/           # Citizen-specific pages
   │   ├── police/            # Police-specific pages
   │   ├── admin/             # Admin-specific pages
   │   └── public/            # Public pages (login, tips tracking)
   ├── guards/
   │   └── RoleGuard.jsx      # Route protection by role
   └── utils/
       ├── firebase.js        # Firebase initialization
       └── helpers.js         # Common utilities
   ```

4. CORS verification:
   - Check `backend/src/main/java/com/crimenet/config/WebConfig.java`
   - Ensure `http://localhost:5173` is allowed
   - If missing, I'll add it

---

### **Phase 1: Authentication Foundation** (Day 1 Afternoon)
**Duration:** 3-4 hours  
**Deliverables:**

1. **Firebase Setup** (`src/utils/firebase.js`)
   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';
   
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     // ... other config
   };
   
   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

2. **AuthContext** (`src/contexts/AuthContext.jsx`)
   - Firebase user state
   - ID token management
   - Role claims from backend
   - Login/Logout/Register methods
   - Loading states

3. **API Client** (`src/api/client.js`)
   ```javascript
   import axios from 'axios';
   import { auth } from '../utils/firebase';
   
   const apiClient = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL,
   });
   
   // Add auth token to every request
   apiClient.interceptors.request.use(async (config) => {
     const user = auth.currentUser;
     if (user) {
       const token = await user.getIdToken();
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });
   
   // Handle errors globally
   apiClient.interceptors.response.use(
     response => response,
     error => {
       if (error.response?.status === 401) {
         // Redirect to login
       }
       return Promise.reject(error);
     }
   );
   
   export default apiClient;
   ```

4. **RoleGuard** (`src/guards/RoleGuard.jsx`)
   - Protect routes by role
   - Redirect unauthorized users
   - Show loading spinner during auth check

5. **Auth Pages**
   - `/login` - Firebase email/password login
   - `/register` - Register with role selection (CITIZEN/POLICE/ADMIN)
   - Backend call to `/api/auth/register` after Firebase signup

---

### **Phase 2: Core User Features** (Day 2 Morning)
**Duration:** 3-4 hours  
**Deliverables:**

1. **User Profile Page** (`/profile`)
   - Display: `GET /api/users/{uid}`
   - Edit profile: `PUT /api/users/{uid}`
   - Fields: fullName, phone, address, languagePreference
   - Admin only: Delete user button

2. **Admin User Management** (`/admin/users`)
   - Filter by role: `GET /api/users/role/{role}`
   - User list table with MUI DataGrid
   - Role badges (CITIZEN/POLICE/ADMIN)

---

### **Phase 3: Crime Reports** (Day 2 Afternoon)
**Duration:** 4-5 hours  
**Deliverables:**

1. **Create Report Page** (`/reports/new`)
   - Form: title, description, category, priority, location
   - Browser geolocation button for lat/long
   - Optional: Mark as anonymous
   - `POST /api/reports`

2. **My Reports Page** (`/reports`)
   - List: `GET /api/reports/user/{userId}`
   - Status filters: PENDING, UNDER_INVESTIGATION, CLOSED
   - Click to view details

3. **Report Details Page** (`/reports/:id`)
   - Display: `GET /api/reports/{id}`
   - Timeline: `GET /api/reports/{id}/timeline`
   - Show: status history, officer assigned, case number
   - Police/Admin: Assign officer button, Update status button

4. **Police Report Management** (`/police/reports`)
   - Filter by status: `GET /api/reports/status/{status}`
   - Assign officer: `PUT /api/reports/{id}/assign`
   - Update status: `PUT /api/reports/{id}/status`
   - Bulk actions (optional)

---

### **Phase 4: Anonymous Tips** (Day 3 Morning)
**Duration:** 2 hours  
**Deliverables:**

1. **Public Tip Submission** (`/tips/submit`)
   - **No authentication required**
   - Form: title, description, category, location, lat/long
   - `POST /api/tips`
   - Show tracking code: `TIP-{timestamp}`

2. **Track Tip Page** (`/tips/track`)
   - Input: tracking code
   - Display: `GET /api/tips/track/{code}`
   - Show status: RECEIVED, VERIFIED, ACTIONED

3. **Police Tips Dashboard** (`/police/tips`)
   - List all tips: `GET /api/tips`
   - Status filters
   - Update status (optional backend enhancement)

---

### **Phase 5: SOS Alerts** (Day 3 Morning)
**Duration:** 2 hours  
**Deliverables:**

1. **SOS Button** (in Navbar for citizens)
   - Red "SOS" button always visible
   - Click → Request geolocation
   - `POST /api/sos/trigger` with lat/long/address
   - Show confirmation modal

2. **Active SOS Badge** (Navbar for police/admin)
   - Real-time count of active SOS alerts
   - Click → `/police/sos` page

3. **Police SOS Dashboard** (`/police/sos`)
   - List active alerts
   - Map view (optional if Google Maps free tier works)
   - Handle button: `PUT /api/sos/{id}/status`

---

### **Phase 6: Notifications** (Day 3 Afternoon)
**Duration:** 2-3 hours  
**Deliverables:**

1. **Notification Bell** (Navbar)
   - Badge with unread count
   - Dropdown popover with recent notifications

2. **Notifications Page** (`/notifications`)
   - List: `GET /api/notifications`
   - Mark as read: `PUT /api/notifications/{id}/read`
   - Filter by type: STATUS_UPDATE, ALERT, REMINDER

3. **In-app Toast Notifications**
   - MUI Snackbar for real-time alerts
   - Firestore listener on `users/{uid}/notifications`

4. **FCM Push (Optional)**
   - If you provide VAPID key
   - Register device: `POST /api/devices` (DeviceRepository)
   - Service worker for background notifications

---

### **Phase 7: Chat & Conversations** (Day 3 Afternoon)
**Duration:** 3-4 hours  
**Deliverables:**

1. **Conversations List** (`/chat`)
   - List: `GET /api/chat/conversations`
   - Show: last message, unread count, participants

2. **Chat Window** (`/chat/:conversationId`)
   - Messages: `GET /api/chat/conversations/{id}/messages`
   - Send message: `POST /api/chat/conversations/{id}/messages`
   - Real-time updates via Firestore listener
   - Read receipts: `PUT /api/chat/conversations/{id}/messages/{messageId}/read`

3. **Create Conversation** (Button in report details)
   - Link conversation to report
   - `POST /api/chat/conversations`
   - Auto-add citizen + assigned officer as participants

---

### **Phase 8: Analytics Dashboards** (Day 4 Morning)
**Duration:** 3 hours  
**Deliverables:**

1. **Admin Dashboard** (`/admin/dashboard`)
   - Statistics cards: `GET /api/analytics/statistics`
     - Total reports (by status)
     - Total users (by role)
     - Total tips
     - Active SOS alerts
   - Category breakdown: `GET /api/analytics/reports/by-category`
     - Pie chart (Recharts)
   - Trends: `GET /api/analytics/trends`
     - Line chart (Recharts)

2. **Police Dashboard** (`/police/dashboard`)
   - Similar to admin but scoped to assigned reports
   - Response time metrics (optional backend enhancement)

---

### **Phase 9: Feedback & Ratings** (Day 4 Morning)
**Duration:** 2 hours  
**Deliverables:**

1. **Submit Feedback** (Button in closed report details)
   - Form: rating (1-5 stars), comment, officer selection
   - `POST /api/feedback`
   - Only for report owner

2. **Officer Profile** (`/officers/:id`)
   - Display officer details
   - Average rating: `GET /api/feedback/officer/{officerId}/rating`
   - Star rating display (MUI Rating component)

3. **Admin Feedback Browse** (`/admin/feedback`)
   - List all feedback: `GET /api/feedback`
   - Filter by officer, user, report

---

### **Phase 10: Missing Persons** (Day 4 Afternoon)
**Duration:** 2 hours  
**Deliverables:**

1. **Browse Missing Persons** (`/missing-persons`)
   - List all cases (read from Firestore `missing_persons` collection)
   - Filters: status (OPEN/FOUND), gender, age range
   - Search by name

2. **Missing Person Details** (`/missing-persons/:id`)
   - Display: photo, name, age, gender, last seen location
   - Physical description: height, build, distinguishing marks
   - Report button for tips

3. **Create Missing Person Report** (Admin/Police only)
   - Form to add new case
   - Save to Firestore

---

### **Phase 11: Stolen Items** (Day 4 Afternoon)
**Duration:** 2 hours  
**Deliverables:**

1. **Browse Stolen Items** (`/stolen-items`)
   - List all items (read from Firestore `stolen_items` collection)
   - Filters: status (LOST/RECOVERED), category, location
   - Search by serial number

2. **Stolen Item Details** (`/stolen-items/:id`)
   - Display: item type, description, serial number, photo
   - Brand, model, color, estimated value
   - Report button if found

3. **Create Stolen Item Report** (Citizen/Police)
   - Form to report stolen item
   - Save to Firestore

---

### **Phase 12: QA & Polish** (Day 4 Evening)
**Duration:** 2-3 hours  
**Deliverables:**

1. **Error Handling**
   - Global error boundary
   - Toast notifications for API errors
   - Retry logic for failed requests

2. **Loading States**
   - MUI Skeleton loaders for data fetching
   - Progress spinners for form submissions

3. **Role-based Navigation**
   - Dynamic navbar based on role
   - Hide/show menu items by role

4. **Responsive Design**
   - Mobile-first Tailwind utility classes
   - MUI responsive breakpoints

5. **Testing**
   - Manual test each feature per role (CITIZEN/POLICE/ADMIN)
   - Create test user accounts for each role
   - Verify all 60+ endpoints are reachable

---

## 📊 FEATURE COVERAGE MATRIX

| Feature | Endpoints | Pages | Role Access | Status |
|---------|-----------|-------|-------------|--------|
| **Authentication** | `/api/auth/*` (2) | Login, Register | Public | Phase 1 |
| **User Profile** | `/api/users/*` (4) | Profile, Admin List | All | Phase 2 |
| **Crime Reports** | `/api/reports/*` (7) | Create, List, Details, Manage | All | Phase 3 |
| **Anonymous Tips** | `/api/tips/*` (3) | Submit, Track, List | Public/Police | Phase 4 |
| **SOS Alerts** | `/api/sos/*` (2) | Trigger, Dashboard | All | Phase 5 |
| **Notifications** | `/api/notifications/*` (2) | List, Center | All | Phase 6 |
| **Chat** | `/api/chat/*` (6) | Conversations, Messages | All | Phase 7 |
| **Analytics** | `/api/analytics/*` (3) | Dashboard, Charts | Police/Admin | Phase 8 |
| **Feedback** | `/api/feedback/*` (7) | Submit, Browse, Officer | All | Phase 9 |
| **Missing Persons** | Firestore direct | Browse, Details, Create | All | Phase 10 |
| **Stolen Items** | Firestore direct | Browse, Details, Create | All | Phase 11 |
| **Device/FCM** | `/api/devices/*` | Background | Optional | Phase 6 (opt) |

**Total Endpoints Integrated:** 60+  
**Total Pages:** 25+ pages  
**Total Components:** 40+ components

---

## 🎨 UI DESIGN DECISIONS

### Why Material-UI (MUI)?
- ✅ Most popular React UI library (3M+ weekly downloads)
- ✅ Excellent TypeScript support
- ✅ Comprehensive component library (forms, tables, modals, etc.)
- ✅ Built-in dark mode support
- ✅ Accessibility (ARIA) out of the box
- ✅ Works perfectly with Tailwind for custom styling
- ✅ Free and open-source

### Why Recharts?
- ✅ React-native charts (not canvas-based like Chart.js)
- ✅ Responsive by default
- ✅ Composable API (easy to customize)
- ✅ Tree-shakeable (smaller bundle size)
- ✅ Perfect for analytics dashboards
- ✅ Free and MIT licensed

### Why Axios over Fetch?
- ✅ Automatic JSON parsing
- ✅ Request/response interceptors (for auth tokens)
- ✅ Better error handling
- ✅ Request cancellation
- ✅ Timeout support
- ✅ Automatic retries (with axios-retry plugin)

### Why React Query?
- ✅ Automatic caching and refetching
- ✅ Background updates
- ✅ Optimistic updates for better UX
- ✅ Pagination and infinite scroll support
- ✅ Reduces boilerplate (no need for useState/useEffect)
- ✅ DevTools for debugging

---

## 🗺️ ROUTING STRUCTURE

```javascript
// Public Routes (no auth required)
/                          → Landing page
/login                     → Login page
/register                  → Register with role selection
/tips/submit               → Anonymous tip submission
/tips/track                → Track tip by code
/missing-persons           → Browse missing persons
/missing-persons/:id       → Missing person details
/stolen-items              → Browse stolen items
/stolen-items/:id          → Stolen item details

// Authenticated Routes (all roles)
/profile                   → User profile
/notifications             → Notifications center
/chat                      → Conversations list
/chat/:conversationId      → Chat window

// Citizen Routes
/citizen/dashboard         → Citizen dashboard (optional)
/reports                   → My reports
/reports/new               → Create report
/reports/:id               → Report details
/sos                       → SOS trigger page (or navbar button)

// Police Routes
/police/dashboard          → Police dashboard with analytics
/police/reports            → Manage all reports
/police/reports/:id        → Report details (with assign/update)
/police/tips               → Anonymous tips management
/police/sos                → Active SOS alerts
/officers/:id              → Officer profile with ratings

// Admin Routes
/admin/dashboard           → Admin analytics dashboard
/admin/users               → User management
/admin/reports             → All reports overview
/admin/feedback            → All feedback
/admin/missing-persons/new → Create missing person case
/admin/stolen-items/new    → Create stolen item report
```

---

## 🔐 SECURITY CHECKLIST

- ✅ Firebase ID tokens verified on every backend request
- ✅ Role-based route guards (RoleGuard component)
- ✅ HTTPS in production (required for geolocation, push notifications)
- ✅ Environment variables for sensitive keys
- ✅ CORS properly configured
- ✅ XSS protection (React escapes by default)
- ✅ No sensitive data in localStorage (only Firebase UID)
- ✅ Token refresh handled by Firebase SDK
- ✅ Logout clears all auth state

---

## 📦 PACKAGE.JSON ADDITIONS

```json
{
  "dependencies": {
    "@mui/material": "^5.15.0",
    "@mui/icons-material": "^5.15.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "axios": "^1.6.0",
    "@tanstack/react-query": "^5.0.0",
    "recharts": "^2.10.0",
    "firebase": "^10.7.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1"
  },
  "devDependencies": {
    "@tanstack/react-query-devtools": "^5.0.0"
  }
}
```

---

## 🚀 DEPLOYMENT CONSIDERATIONS

### Development
```bash
# Backend (Terminal 1)
cd backend
mvn spring-boot:run

# Frontend (Terminal 2)
cd ../
npm run dev
```

### Production
- Backend: Railway.app, Render.com, or Fly.io
- Frontend: Vercel, Netlify, or Firebase Hosting
- Environment variables: Set in platform dashboard
- CORS: Update allowed origins to production URLs

---

## 📝 POSTMAN COLLECTION (Bonus)

I'll create a Postman collection with all 60+ endpoints pre-configured:
- Environment variables for `{{baseUrl}}` and `{{token}}`
- Example requests for each endpoint
- Test scripts to validate responses
- Organized by feature (Auth, Reports, Tips, etc.)

---

## ⚠️ KNOWN LIMITATIONS & FUTURE ENHANCEMENTS

### Not Included in v1
- ❌ File uploads (media attachments)
- ❌ OTP login
- ❌ Email verification screens
- ❌ Blockchain evidence verification
- ❌ Offline sync
- ❌ Voice-to-text for reports
- ❌ WebSocket for chat (using Firestore listeners instead)

### Free Tier Limits
- **Firebase Firestore:** 50K reads, 20K writes, 20K deletes per day
- **Firebase Auth:** Unlimited users
- **Firebase Hosting:** 10GB storage, 360MB/day bandwidth
- **Google Maps:** $200/month free credit (~28K map loads)
- **FCM:** Unlimited push notifications

---

## 🎯 SUCCESS CRITERIA

### Functional
- ✅ All roles can login and see role-appropriate pages
- ✅ Citizens can create reports and track them
- ✅ Police can assign officers and update report status
- ✅ Admin can manage users and view analytics
- ✅ Anonymous tips can be submitted without login
- ✅ SOS alerts trigger with geolocation
- ✅ Chat works between citizen and officer
- ✅ Feedback can be submitted for officers
- ✅ Missing persons and stolen items are browsable

### Technical
- ✅ All 60+ backend endpoints are called correctly
- ✅ No CORS errors
- ✅ Auth token automatically attached to requests
- ✅ Loading states for all async operations
- ✅ Error messages displayed to user
- ✅ No console errors in browser
- ✅ Responsive on mobile (375px) and desktop (1920px)

### Performance
- ✅ Initial page load < 3 seconds
- ✅ API responses < 1 second (local backend)
- ✅ Chart rendering < 500ms
- ✅ Chat messages appear < 2 seconds (Firestore listener)

---

## 📞 NEXT STEPS - YOUR ACTION ITEMS

Before I start implementation, please confirm:

1. **Firebase Web Config (REQUIRED)**
   - Go to: https://console.firebase.google.com/project/crime-net-12f88/settings/general
   - Scroll to "Your apps" → Click "Web app" icon → Copy the config
   - Share the config object (or I can use placeholder and you add it later)

2. **Approval of This Plan**
   - Review all 12 phases above
   - Confirm scope (Missing Persons + Stolen Items included)
   - Confirm libraries (MUI + Recharts + Axios)
   - Any changes or additions?

3. **Google Maps API Key (Optional)**
   - If you want maps on SOS/report pages
   - Get free $200/month credit at: https://console.cloud.google.com/google/maps-apis
   - Or we use Leaflet (100% free, no key needed)

4. **Start Implementation**
   - Once you approve, I'll begin with Phase 0 (setup)
   - I'll commit after each phase for easy review
   - Estimated completion: 3-4 days (all phases)

---

## ✅ APPROVAL CHECKLIST

Please confirm each item before I start:

- [ ] **Backend URL:** `http://localhost:8080` is correct
- [ ] **Frontend URL:** `http://localhost:5173` is correct
- [ ] **Authentication:** Use Firebase Auth with email/password
- [ ] **UI Library:** Material-UI (MUI) approved
- [ ] **Charts:** Recharts approved
- [ ] **Real-time Chat:** Firestore listeners approved
- [ ] **Maps:** Leaflet (free) for now, Google Maps if key available later
- [ ] **Scope:** Missing Persons + Stolen Items included in v1
- [ ] **File Uploads:** Deferred to v2 (not now)
- [ ] **Push Notifications:** Will implement if you provide VAPID key
- [ ] **All 12 Phases:** Approved as written above

---

## 🎊 READY TO BUILD!

Once you confirm the above checklist and provide Firebase web config, I'll start implementing immediately. The frontend will have:
- ✨ Beautiful Material-UI design
- 📊 Interactive analytics dashboards
- 💬 Real-time chat system
- 🚨 One-click SOS alerts
- 🔐 Secure Firebase authentication
- 📱 Fully responsive mobile design
- 🎯 100% backend API coverage

**Expected Timeline:**
- Day 1: Phases 0-2 (Setup, Auth, Users)
- Day 2: Phases 3-5 (Reports, Tips, SOS)
- Day 3: Phases 6-8 (Notifications, Chat, Analytics)
- Day 4: Phases 9-12 (Feedback, Missing/Stolen, QA)

Let me know if this plan looks good, and I'll get started! 🚀
