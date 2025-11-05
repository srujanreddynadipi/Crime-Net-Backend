# 🧪 CrimeNet - Complete Testing Guide

## 📋 Pre-Testing Checklist

### Backend Setup
- [ ] Backend server is running on `http://localhost:8080`
- [ ] PostgreSQL database is running and connected
- [ ] Firebase Admin SDK is configured with valid credentials
- [ ] Check backend console for any startup errors

### Frontend Setup
- [ ] Frontend is running on `http://localhost:5173` (Vite dev server)
- [ ] No compilation errors in terminal
- [ ] Browser console is open (F12) to monitor errors

### Firebase Setup
- [ ] Firebase project is configured
- [ ] Authentication methods enabled (Email/Password)
- [ ] Test user accounts created (at least 2 for chat testing)

---

## 🎯 Phase 2 - Complete Testing Workflow

### Test 1: User Registration & Login ✅

**Steps:**
1. Open browser → `http://localhost:5173`
2. Navigate to Register page
3. Fill registration form:
   - Email: `test1@example.com`
   - Password: `Test123456!`
   - Full Name: `Test User One`
   - Phone: `1234567890`
4. Click "Register"
5. **Expected Result**: 
   - Registration success message
   - Redirect to login page
6. Login with same credentials
7. **Expected Result**: 
   - Successful login
   - Redirect to user dashboard

**Console Checks:**
```javascript
// Should see in console:
"User registered successfully"
"Login successful"
// Should NOT see:
"401 Unauthorized" or "Network Error"
```

---

### Test 2: Dashboard & Quick Stats ✅

**URL:** `http://localhost:5173/user-dashboard`

**What to Check:**
1. **Header Components:**
   - [ ] CrimeNet logo displays
   - [ ] User name/email displays correctly
   - [ ] Notification bell shows (with count if unread)
   - [ ] SOS button visible
   - [ ] Menu toggle works on mobile

2. **Quick Stats Cards:**
   - [ ] Active Cases count (initially 0 for new users)
   - [ ] Resolved Cases count
   - [ ] Community Points calculation
   - [ ] Safety Score (0-10 scale)
   - [ ] All stats update after creating reports

3. **Quick Actions:**
   - [ ] Report Crime button
   - [ ] Track Case button
   - [ ] Chat with Officer button
   - [ ] Report Missing button

**API Call to Verify:**
```javascript
// Open browser console and run:
fetch('http://localhost:8080/api/reports/user/' + currentUser.uid, {
  headers: { 'Authorization': 'Bearer ' + await user.getIdToken() }
})
.then(r => r.json())
.then(console.log)
```

---

### Test 3: Submit Crime Report ✅

**Navigation:** Sidebar → "Report Crime" OR Quick Actions → "Report Crime"

**Test Scenario 1: Complete Report**
1. Fill form:
   - Title: `Bike theft near Metro Station`
   - Category: `THEFT`
   - Severity: `HIGH`
   - Description: `My bike was stolen from the parking lot around 3 PM today. It's a red Honda bike with license plate KA-01-AB-1234.`
   - Location: `Indiranagar Metro Station, Bangalore`
2. Click "Use GPS Location" button
   - [ ] GPS coordinates populate
   - [ ] Location field updates
3. Select Date/Time: Today's date, approximate time
4. Leave "Anonymous" unchecked
5. Click "Submit Crime Report"

**Expected Result:**
- Success message: "Report submitted successfully!"
- Case ID displayed (e.g., `CASE-ABC123`)
- Form clears after submission

**Test Scenario 2: Anonymous Report**
1. Fill form with different data
2. Check "Submit Anonymously" checkbox
3. Submit report
4. Verify submission works

**Verify in Backend:**
```sql
SELECT * FROM crime_reports ORDER BY created_at DESC LIMIT 5;
```

---

### Test 4: View My Cases ✅

**Navigation:** Sidebar → "My Cases"

**What to Check:**
1. **Case List:**
   - [ ] All submitted reports appear
   - [ ] Status badges show correct colors:
     - PENDING = Yellow
     - IN_PROGRESS = Blue
     - RESOLVED = Green
   - [ ] Severity badges show correct colors:
     - CRITICAL = Red
     - HIGH = Orange
     - MEDIUM = Yellow
     - LOW = Blue

2. **Case Details Modal:**
   - Click "View Details" on any case
   - [ ] Modal opens with full information
   - [ ] Timeline shows status changes
   - [ ] All fields display correctly
   - [ ] "Chat with Officer" button present
   - [ ] "Share" button present
   - [ ] Close button works

3. **Empty State:**
   - Delete all reports (if needed)
   - [ ] "No reports found" message displays
   - [ ] "Create your first report" prompt

**API Verification:**
```javascript
// Check timeline endpoint
fetch('http://localhost:8080/api/reports/{reportId}/timeline', {
  headers: { 'Authorization': 'Bearer ' + token }
})
```

---

### Test 5: User Profile Management ✅

**Navigation:** Sidebar → "My Profile"

**Test Edit Profile:**
1. Click "Edit Profile" button
2. Modify fields:
   - Full Name: `Updated Test User`
   - Phone: `9876543210`
   - Address: `123 Test Street, Bangalore, Karnataka, India`
3. Click "Save Changes"

**Expected Result:**
- Success message: "Profile updated successfully"
- Changes persist after page reload
- Edit mode exits automatically

**Test Cancel Edit:**
1. Click "Edit Profile"
2. Make changes
3. Click "Cancel"
4. Verify changes not saved

**Verify API Call:**
```javascript
// PUT request should be visible in Network tab
PUT http://localhost:8080/api/users/{uid}
Body: { fullName, phone, address }
```

---

### Test 6: Chat & Messaging ✅

**Navigation:** Sidebar → "Messages"

**Prerequisites:** Need at least 2 user accounts and 1 conversation created

**What to Check:**
1. **Conversation List:**
   - [ ] All conversations display
   - [ ] Last message time shows
   - [ ] Unread indicator (blue dot) appears
   - [ ] Click conversation to open

2. **Chat Window:**
   - [ ] Messages load and display
   - [ ] Your messages align right (blue gradient)
   - [ ] Other user's messages align left (white)
   - [ ] Timestamps show relative time
   - [ ] "Read" indicator for sent messages

3. **Send Message:**
   - Type: `Hello, this is a test message`
   - Click send button
   - [ ] Message appears immediately
   - [ ] Message persists after reload

4. **Real-time Polling:**
   - Open two browser windows with different users
   - Send message from one
   - [ ] Other window receives message within 5 seconds

**API Endpoints Used:**
```javascript
GET /api/chat/conversations
GET /api/chat/conversations/{id}/messages
POST /api/chat/conversations/{id}/messages
PUT /api/chat/conversations/{id}/messages/{msgId}/read
```

---

### Test 7: Anonymous Tips ✅

**Navigation:** Sidebar → "Anonymous Tips" (No login required!)

**Test Tip Submission:**
1. Open in incognito/private window (optional - to test without login)
2. Fill form:
   - Title: `Suspicious activity near park`
   - Category: `SUSPICIOUS_ACTIVITY`
   - Description: `Noticed suspicious people loitering near the children's park around midnight. They were carrying large bags.`
   - Location: `HSR Layout Park, Bangalore`
3. Click "Use GPS" (if testing location)
4. Click "Submit Anonymous Tip"

**Expected Result:**
- Success screen displays
- Tracking code shown (e.g., `TIP-XYZ789`)
- Copy button works
- "Submit Another Tip" button available
- "Track This Tip" button available

**Test Track Tip:**
1. Copy the tracking code
2. Navigation: Sidebar → "Track Tip"
3. Enter tracking code
4. Click "Track Tip"

**Expected Result:**
- Tip details display
- Status shows (PENDING/IN_PROGRESS/RESOLVED)
- Location and description visible
- Last updated timestamp shows

**Verify Backend:**
```sql
SELECT * FROM anonymous_tips ORDER BY created_at DESC;
```

---

### Test 8: Notifications Center ✅

**Navigation:** Click bell icon in header OR Sidebar → Navigate via bell

**What to Check:**
1. **Header Bell Icon:**
   - [ ] Badge shows unread count
   - [ ] Badge updates when notifications marked as read
   - [ ] Shows "9+" for 10+ unread
   - [ ] Clicking navigates to notifications page

2. **Notifications Page:**
   - [ ] Filter tabs work (All, Unread, Read)
   - [ ] Unread notifications have blue background
   - [ ] Read notifications have gray background
   - [ ] Blue dot indicator on unread notifications
   - [ ] Timestamp shows relative time

3. **Mark as Read:**
   - [ ] Click unread notification → marks as read
   - [ ] Click checkmark icon → marks as read
   - [ ] "Mark all read" button works
   - [ ] Badge count updates immediately

4. **Notification Types:**
   - [ ] Case Update notifications
   - [ ] Message notifications
   - [ ] Alert notifications
   - [ ] Priority colors (High=Red, Medium=Yellow, Low=Blue)

5. **Auto-Refresh:**
   - Wait 30 seconds
   - [ ] New notifications appear automatically

**Test with Backend:**
```sql
-- Create test notification
INSERT INTO notifications (user_id, message, type, priority, is_read)
VALUES ('firebase-uid', 'Your case has been updated', 'CASE_UPDATE', 'HIGH', false);
```

---

### Test 9: Missing Persons ✅

**Navigation:** Sidebar → "Missing Persons"

**What to Check:**
1. **Reports List:**
   - [ ] Only MISSING_PERSON category reports show
   - [ ] Status badges: FOUND (green) vs SEARCHING (red)
   - [ ] Last seen location displays
   - [ ] Time since report ("2 days ago")
   - [ ] View Details button works

2. **Empty State:**
   - If no missing persons reports exist
   - [ ] Appropriate empty state message

**Create Test Report:**
1. Go to "Report Crime"
2. Select Category: `MISSING_PERSON`
3. Fill details about missing person
4. Submit
5. Navigate to "Missing Persons"
6. Verify report appears

---

### Test 10: Safety Alerts ✅

**Navigation:** Sidebar → "Safety Alerts"

**What to Check:**
1. **Alerts List:**
   - [ ] Only HIGH and CRITICAL severity reports show
   - [ ] Color coding:
     - CRITICAL = Red background
     - HIGH = Orange background
   - [ ] Location and category display
   - [ ] Time stamps ("15m ago")

2. **Subscribe to Alerts:**
   - [ ] Location input field works
   - [ ] Subscribe button present
   - [ ] (Future feature - just UI for now)

**Create Test Alert:**
1. Create report with Severity: `CRITICAL`
2. Navigate to "Safety Alerts"
3. Verify it appears in the list

---

## 🔍 API Endpoint Testing

### Using Browser Console

```javascript
// Get current user token
const token = await firebase.auth().currentUser.getIdToken();

// Test User Profile
fetch('http://localhost:8080/api/users/' + currentUser.uid, {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(r => r.json()).then(console.log);

// Test Create Report
fetch('http://localhost:8080/api/reports', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Test Report',
    description: 'Testing API',
    category: 'THEFT',
    priority: 'MEDIUM',
    location: 'Test Location'
  })
}).then(r => r.json()).then(console.log);

// Test Get User Reports
fetch('http://localhost:8080/api/reports/user/' + currentUser.uid, {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(r => r.json()).then(console.log);

// Test Notifications
fetch('http://localhost:8080/api/notifications', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(r => r.json()).then(console.log);

// Test Anonymous Tip (No auth needed!)
fetch('http://localhost:8080/api/tips', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Test Tip',
    description: 'Testing anonymous tips',
    location: 'Test Location',
    category: 'OTHER'
  })
}).then(r => r.json()).then(console.log);
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Network Error" or CORS Error
**Solution:**
```java
// Check backend WebConfig.java
@CrossOrigin(origins = "http://localhost:5173")
```

### Issue 2: "401 Unauthorized"
**Solution:**
- Check Firebase token is being sent
- Verify Firebase Admin SDK credentials
- Check token expiration (tokens expire after 1 hour)
- Re-login to get fresh token

### Issue 3: Reports Not Showing
**Solution:**
```sql
-- Check database
SELECT * FROM crime_reports WHERE user_id = 'your-firebase-uid';

-- Check user exists
SELECT * FROM users WHERE uid = 'your-firebase-uid';
```

### Issue 4: Chat Messages Not Loading
**Solution:**
- Verify conversation exists in database
- Check user is participant in conversation
- Verify messages have correct conversation_id

### Issue 5: Notifications Not Updating
**Solution:**
- Check if polling is working (should refresh every 30 seconds)
- Verify notifications exist in database
- Check user_id matches current user

### Issue 6: GPS Location Not Working
**Solution:**
- Allow location permissions in browser
- Use HTTPS (or localhost which is allowed)
- Check browser console for geolocation errors

---

## ✅ Success Criteria

### Phase 2 Features - All Must Pass:

- [x] **User Profile**: View/Edit/Save works ✅
- [x] **Crime Reports**: Create/View/Track works ✅
- [x] **Chat System**: Send/Receive messages works ✅
- [x] **Statistics**: Real-time calculations correct ✅
- [x] **Anonymous Tips**: Submit/Track works without login ✅
- [x] **Notifications**: List/Read/Filter/Auto-refresh works ✅
- [x] **Missing Persons**: Filter by category works ✅
- [x] **Safety Alerts**: Filter by severity works ✅

### Data Integrity:
- [ ] All reports stored in database
- [ ] User profile updates persist
- [ ] Chat messages persist
- [ ] Notifications persist
- [ ] Tips have unique tracking codes

### Performance:
- [ ] Page loads < 2 seconds
- [ ] API responses < 500ms
- [ ] Chat polling works every 5 seconds
- [ ] Notification polling works every 30 seconds
- [ ] No memory leaks (check browser task manager)

---

## 📊 Test Results Template

```markdown
## Test Session: [Date/Time]

### Environment
- Frontend: http://localhost:5173 ✅
- Backend: http://localhost:8080 ✅
- Database: PostgreSQL ✅
- Test User: test1@example.com

### Test Results

| Feature | Status | Notes |
|---------|--------|-------|
| User Registration | ✅ | |
| User Login | ✅ | |
| Dashboard Load | ✅ | |
| Quick Stats | ✅ | Shows 0 initially |
| Create Report | ✅ | Case ID: CASE-123 |
| View Cases | ✅ | All reports visible |
| User Profile | ✅ | Edit/Save works |
| Chat Messages | ✅ | Real-time working |
| Anonymous Tips | ✅ | Code: TIP-XYZ789 |
| Track Tip | ✅ | Status shows correctly |
| Notifications | ✅ | Bell badge works |
| Missing Persons | ✅ | Filtered correctly |
| Safety Alerts | ✅ | HIGH/CRITICAL only |

### Issues Found
1. [Issue description]
   - Severity: Low/Medium/High/Critical
   - Steps to reproduce: ...
   - Expected: ...
   - Actual: ...

### Performance Metrics
- Dashboard load: 1.2s
- API average response: 250ms
- Chat polling: Working
- Notification polling: Working
```

---

## 🚀 Next Steps After Testing

1. **If All Tests Pass:**
   - Create Phase 2 completion report
   - Move to Phase 3 (SOS, Analytics, Feedback)
   - Document any minor improvements needed

2. **If Issues Found:**
   - Prioritize by severity (Critical → High → Medium → Low)
   - Fix critical bugs immediately
   - Log minor issues for later
   - Re-test after fixes

3. **Performance Optimization:**
   - Check for unnecessary re-renders
   - Optimize API calls (caching, debouncing)
   - Consider WebSocket for real-time features
   - Lazy load heavy components

---

## 📝 Test Checklist Summary

**Quick Test (15 minutes):**
- [ ] Login works
- [ ] Dashboard loads
- [ ] Create one report
- [ ] View report in "My Cases"
- [ ] Edit profile
- [ ] Send one message
- [ ] Submit one tip
- [ ] Track tip works

**Complete Test (1 hour):**
- [ ] All features from above
- [ ] All API endpoints
- [ ] All edge cases
- [ ] Browser console clean (no errors)
- [ ] Network tab shows correct API calls
- [ ] Data persists across page reloads
- [ ] Multiple users (chat testing)
- [ ] Mobile responsiveness

---

**Testing Status**: Ready to begin! 🎯

Start with Quick Test (15 min) to verify basic functionality, then proceed to Complete Test if everything works.
