# 🚀 CrimeNet - Quick Test Checklist (15 Minutes)

**Status**: Phase 2 - 77% Complete (10/13 features)  
**Frontend**: http://localhost:5173  
**Backend**: http://localhost:8080

---

## ✅ Pre-Flight Check

- [ ] Backend is running (check terminal or visit http://localhost:8080/actuator/health)
- [ ] Frontend is running at http://localhost:5173
- [ ] Browser console open (F12) to check for errors

---

## 🧪 5-Minute Smoke Test

### 1️⃣ **Authentication** (2 min)
- [ ] Open http://localhost:5173
- [ ] Click "Sign Up" or "Login"
- [ ] Login with existing user OR register new user
- [ ] Dashboard loads successfully
- [ ] User name shows in header (top right)
- [ ] Quick Stats cards display (4 cards with numbers)

**✅ PASS** | **❌ FAIL**: ___________

---

### 2️⃣ **Anonymous Tips** (2 min) - **NEW FEATURE**
- [ ] Click "Anonymous Tips" in sidebar (EyeOff icon)
- [ ] Fill in form:
  - Title: "Test Suspicious Activity"
  - Description: "Testing the system"
  - Location: "Test Location"
  - Category: Select any (e.g., "SUSPICIOUS_ACTIVITY")
  - Click "Use Current Location" (allow GPS permission)
- [ ] Click "Submit Tip"
- [ ] Success message displays with **tracking code**
- [ ] Copy the tracking code

**Tracking Code**: _________________

**✅ PASS** | **❌ FAIL**: ___________

---

### 3️⃣ **Track Tip** (1 min) - **NEW FEATURE**
- [ ] Click "Track Tip" in sidebar (Eye icon)
- [ ] Paste the tracking code from step 2
- [ ] Click "Track Tip"
- [ ] Tip details display with status (should be "PENDING" - yellow)
- [ ] All info matches what you submitted

**✅ PASS** | **❌ FAIL**: ___________

---

## 🧪 10-Minute Full Test

### 4️⃣ **Notifications Center** (2 min) - **NEW FEATURE**
- [ ] Look at bell icon in header (top right)
- [ ] Check if badge shows unread count
- [ ] Click bell icon
- [ ] Notifications page opens
- [ ] Filter tabs work (All / Unread / Read)
- [ ] Click any unread notification
- [ ] Notification turns gray (marked as read)
- [ ] Badge count decreases

**✅ PASS** | **❌ FAIL**: ___________

---

### 5️⃣ **Submit Crime Report** (3 min)
- [ ] Click "Report Crime" in sidebar
- [ ] Fill in form:
  - Type: Select "THEFT"
  - Description: "Test laptop stolen from office"
  - Location: "Office Building, Room 101"
  - Date: Today's date
- [ ] Click "Use Current Location" (allow GPS)
- [ ] Click "Submit Report"
- [ ] Success message displays
- [ ] "View My Cases" button appears

**✅ PASS** | **❌ FAIL**: ___________

---

### 6️⃣ **View My Cases** (2 min)
- [ ] Click "My Cases" in sidebar
- [ ] Your test report appears in list
- [ ] Click "View Details" button
- [ ] Modal opens with full case details
- [ ] Timeline section shows creation event
- [ ] Status shows "PENDING" (blue badge)

**✅ PASS** | **❌ FAIL**: ___________

---

### 7️⃣ **User Profile** (1 min)
- [ ] Click "Profile" in sidebar
- [ ] Profile information displays
- [ ] Try editing name or phone
- [ ] Click "Save Changes"
- [ ] Success message appears
- [ ] Reload page - changes persist

**✅ PASS** | **❌ FAIL**: ___________

---

### 8️⃣ **Chat Module** (2 min)
- [ ] Click "Chat" in sidebar
- [ ] Admin chat room appears in list
- [ ] Click on chat room
- [ ] Chat interface opens
- [ ] Type a test message: "Testing chat system"
- [ ] Click send (paper plane icon)
- [ ] Message appears in chat history
- [ ] Wait 5 seconds - page should auto-refresh (check console for "Polling chat messages...")

**✅ PASS** | **❌ FAIL**: ___________

---

## 🐛 Common Issues & Quick Fixes

### Backend Not Running
```bash
cd backend
mvn spring-boot:run
```

### Frontend Port 5173 Already in Use
```bash
# Kill process using port 5173
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force

# Restart frontend
npm run dev
```

### 401 Unauthorized Errors
- Logout and login again
- Check browser console for Firebase token
- Clear browser cache (Ctrl+Shift+Delete)

### GPS Not Working
- Check browser permissions (address bar icon)
- Try HTTPS (or use localhost - should work)
- Manually enter location if GPS fails

### Notifications Not Loading
- Check backend logs for errors
- Verify user is logged in
- Check browser console for API errors

---

## 📊 Test Results Summary

**Completed Tests**: __ / 8

**Critical Issues**: _________________________________________

**Minor Issues**: _________________________________________

**Overall Status**: 
- ✅ Ready for Phase 2 completion (SOS, Analytics, Feedback)
- 🔧 Needs fixes (list issues above)
- ❌ Major problems found (describe below)

---

## 🎯 What's Working (Check All That Apply)

- [ ] User authentication (login/signup)
- [ ] Dashboard quick stats
- [ ] Submit crime reports
- [ ] View my cases with details
- [ ] User profile management
- [ ] Chat messaging with auto-refresh
- [ ] **Anonymous tips submission** (NEW)
- [ ] **Track tip by code** (NEW)
- [ ] **Notifications center with badge** (NEW)
- [ ] Missing persons list
- [ ] Safety alerts list

---

## 🚀 Next Steps

### If All Tests Pass ✅
**Continue with Phase 2 remaining features:**
1. SOS Alert System (emergency button with GPS)
2. Analytics Dashboards (Recharts visualizations)
3. Feedback & Rating System (officer ratings)

### If Issues Found 🔧
**Report issues in this format:**
```
Component: [e.g., Notifications]
Issue: [e.g., Badge count not updating]
Steps to Reproduce: [1. Login, 2. Click bell icon, 3. ...]
Error Message: [from browser console]
```

---

## 💡 Pro Tips

1. **Keep browser console open** (F12) - all errors show here
2. **Check Network tab** - see API calls (red = failed)
3. **Logout and login** - fixes most auth issues
4. **Refresh page** - some state updates need refresh
5. **Test anonymous tips without logging in** - open incognito window

---

**Last Updated**: Session Summary  
**Phase 2 Progress**: 10/13 features complete (77%)  
**API Endpoints Connected**: 17+  
**Real-time Features**: Chat (5s polling), Notifications (30s polling)
