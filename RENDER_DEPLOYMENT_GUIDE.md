# Render Deployment Guide for CrimeNet Backend

## Files to Add to Backend Repository

### 1. Create `render.yaml` in the root of your backend repo:
```yaml
services:
  - type: web
    name: crimenet-backend
    env: java
    buildCommand: mvn clean install -DskipTests
    startCommand: java -jar target/crimenet-backend-1.0.0.jar
    envVars:
      - key: PORT
        value: 8080
      - key: JAVA_TOOL_OPTIONS
        value: -Xmx512m
```

### 2. Create `system.properties` in the root of your backend repo:
```
java.runtime.version=17
```

### 3. Update `src/main/resources/application.yml`:
Change the port configuration to use environment variable:
```yaml
server:
  port: ${PORT:8080}
```

### 4. Update CORS in `src/main/java/com/crimenet/config/WebConfig.java`:
Add your Firebase hosting URLs:
```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://crime-net-12f88.web.app",
    "https://crime-net-12f88.firebaseapp.com"
));
```

---

## Deployment Steps on Render.com

### Step 1: Sign Up / Login to Render
1. Go to https://render.com
2. Sign up with GitHub (recommended) or email
3. Authorize Render to access your GitHub repositories

### Step 2: Create a New Web Service
1. Click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub repository: `https://github.com/srujanreddynadipi/Crime-Net-Backend.git`
4. Click **"Connect"**

### Step 3: Configure the Service
Fill in these settings:

- **Name:** `crimenet-backend` (or any name you prefer)
- **Region:** Choose closest to your users (e.g., Oregon, Frankfurt, Singapore)
- **Branch:** `main` (or your default branch)
- **Root Directory:** Leave blank (unless your backend is in a subdirectory)
- **Environment:** `Java`
- **Build Command:** `mvn clean install -DskipTests`
- **Start Command:** `java -jar target/crimenet-backend-1.0.0.jar`
- **Instance Type:** `Free`

### Step 4: Add Environment Variables
Click **"Advanced"** and add these environment variables:

1. **PORT:** `8080`
2. **JAVA_TOOL_OPTIONS:** `-Xmx512m`
3. **FIREBASE_SERVICE_ACCOUNT_JSON:** (Copy the entire content of your Firebase service account JSON file)

**Important:** For the Firebase service account:
- Open `src/main/resources/crime-net-12f88-firebase-adminsdk-fbsvc-0f2e4a5d71.json`
- Copy the ENTIRE JSON content
- Paste it as the value for `FIREBASE_SERVICE_ACCOUNT_JSON` environment variable

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Build your Spring Boot application
   - Deploy it to a live URL
3. Wait for deployment (usually 5-10 minutes for first deploy)

### Step 6: Get Your Backend URL
Once deployed, you'll get a URL like:
```
https://crimenet-backend.onrender.com
```

---

## Update Frontend to Use Backend URL

After deployment, update your frontend API client:

### File: `src/api/client.ts`
```typescript
const apiClient = axios.create({
  baseURL: 'https://YOUR-BACKEND-URL.onrender.com', // Replace with your actual Render URL
  headers: {
    'Content-Type': 'application/json',
  },
});
```

Then rebuild and redeploy your frontend:
```bash
npm run build
firebase deploy --only hosting
```

---

## Important Notes

### Free Tier Limitations:
- Service **sleeps after 15 minutes** of inactivity
- Takes ~30 seconds to wake up on first request
- 750 hours/month (always-on if only one service)

### Keep Service Awake (Optional):
Use a service like:
- **UptimeRobot** (https://uptimerobot.com) - Free
- **Cron-job.org** (https://cron-job.org) - Free
- Ping your backend URL every 10-14 minutes

### Firestore Permissions:
Make sure your Firebase service account has:
- Firestore Database access
- Firebase Authentication access

### Logs and Monitoring:
- View logs in Render dashboard: **Logs** tab
- Monitor performance: **Metrics** tab
- Set up alerts for errors

---

## Troubleshooting

### Build Fails:
1. Check Java version in `system.properties` matches your `pom.xml`
2. Verify Maven dependencies can be downloaded
3. Check logs for specific errors

### Service Won't Start:
1. Check if PORT environment variable is set
2. Verify JAR file name in start command matches your `pom.xml` artifact name
3. Check Firebase credentials are correct

### 502 Bad Gateway:
1. Service is still waking up (wait 30 seconds)
2. Service crashed - check logs
3. Health check failed - verify your app starts correctly

### CORS Errors:
1. Verify Firebase URLs are in `WebConfig.java`
2. Check CORS configuration includes all required origins
3. Ensure credentials are allowed

---

## Next Steps After Deployment

1. ✅ Test all API endpoints
2. ✅ Update frontend to use production backend URL
3. ✅ Test authentication flow
4. ✅ Test file uploads (if any)
5. ✅ Monitor logs for errors
6. ✅ Set up uptime monitoring (optional)

---

## Support

- **Render Docs:** https://render.com/docs
- **Spring Boot on Render:** https://render.com/docs/deploy-spring-boot
- **Community Forum:** https://community.render.com

---

**Your backend repository:** https://github.com/srujanreddynadipi/Crime-Net-Backend.git
**Your frontend URL:** https://crime-net-12f88.web.app
**Your backend URL (after deploy):** https://YOUR-SERVICE-NAME.onrender.com
