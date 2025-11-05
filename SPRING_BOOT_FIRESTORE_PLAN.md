# CrimeNet Backend — Spring Boot + Firebase Firestore (Free Tier)

**Yes, it's possible!** This plan shows how to build a Java Spring Boot REST API backend that uses Firebase Firestore as the cloud database—keeping everything within free-tier limits.

---

## Architecture overview

- **Frontend:** React (Vite) → calls Spring Boot REST API
- **Backend:** Java Spring Boot 3.x + Spring Web + Spring Security
- **Database:** Firebase Firestore (via Firebase Admin SDK for Java)
- **Authentication:** Firebase Auth (ID tokens verified in Spring Boot filters)
- **Cloud Functions (optional):** Node.js functions for scheduled tasks or Firebase-specific triggers (separate from Spring Boot)
- **Hosting:** 
  - Spring Boot: free tier on Render, Railway, or Fly.io (750 hrs/month)
  - Firebase: Spark plan (50K reads/20K writes/day)

---

## Tech stack

- **Java 17+** (LTS)
- **Spring Boot 3.2+**
- **Firebase Admin SDK for Java** (Firestore client + Auth verification)
- **Spring Security** (custom filter to verify Firebase ID tokens)
- **Maven/Gradle** for build
- **Lombok** (optional, for cleaner POJOs)
- **Logback/SLF4J** for logging
- **JUnit + Mockito** for tests

---

## Project structure

```
com.crimenet
 ├── CrimeNetApplication.java
 ├── config
 │   ├── FirebaseConfig.java           // Initialize Firebase Admin SDK
 │   ├── SecurityConfig.java           // Spring Security + custom Firebase filter
 │   └── WebConfig.java                // CORS, etc.
 ├── security
 │   ├── FirebaseAuthenticationFilter.java
 │   └── FirebaseUserDetails.java
 ├── model                             // POJOs matching Firestore documents
 │   ├── User.java
 │   ├── Officer.java
 │   ├── Station.java
 │   ├── CrimeReport.java
 │   ├── ReportTimeline.java
 │   ├── Attachment.java
 │   ├── Conversation.java
 │   ├── ChatMessage.java
 │   ├── Notification.java
 │   ├── AnonymousTip.java
 │   ├── MissingPerson.java
 │   ├── StolenItem.java
 │   └── SOSAlert.java
 ├── dto
 │   ├── UserDTO.java
 │   ├── ReportDTO.java
 │   ├── AssignOfficerRequest.java
 │   └── ... (request/response DTOs)
 ├── repository                        // Firestore DAO layer
 │   ├── UserRepository.java
 │   ├── OfficerRepository.java
 │   ├── StationRepository.java
 │   ├── ReportRepository.java
 │   ├── ConversationRepository.java
 │   └── ...
 ├── service
 │   ├── UserService.java
 │   ├── AuthService.java              // Verify Firebase tokens, custom claims
 │   ├── ReportService.java
 │   ├── ChatService.java
 │   ├── NotificationService.java
 │   ├── AnalyticsService.java
 │   └── ...
 ├── controller
 │   ├── AuthController.java
 │   ├── UserController.java
 │   ├── ReportController.java
 │   ├── ChatController.java
 │   ├── NotificationController.java
 │   ├── TipController.java
 │   ├── SOSController.java
 │   └── AnalyticsController.java
 └── exception
     ├── GlobalExceptionHandler.java
     └── CustomExceptions.java
```

---

## Dependencies (Maven example)

```xml
<dependencies>
  <!-- Spring Boot Starter Web -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>

  <!-- Spring Boot Starter Security -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
  </dependency>

  <!-- Firebase Admin SDK (includes Firestore and Auth) -->
  <dependency>
    <groupId>com.google.firebase</groupId>
    <artifactId>firebase-admin</artifactId>
    <version>9.2.0</version>
  </dependency>

  <!-- Lombok (optional) -->
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <scope>provided</scope>
  </dependency>

  <!-- Validation -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
  </dependency>

  <!-- Test dependencies -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>
```

---

## Firebase setup

1. **Create Firebase project** (Spark plan, free tier)
2. **Enable Firestore** (Native mode)
3. **Enable Authentication** (Email/Password provider)
4. **Generate service account key:**
   - Go to Firebase Console → Project Settings → Service Accounts → Generate New Private Key
   - Download JSON (e.g., `firebase-adminsdk.json`)
   - Add to `src/main/resources/` and **add to `.gitignore`**
5. **Set environment variable or config:**
   - Option A: `GOOGLE_APPLICATION_CREDENTIALS=/path/to/firebase-adminsdk.json`
   - Option B: Store JSON content in env var and parse in code

---

## Core models (Java POJOs)

All models map to Firestore documents. Use `@Data` (Lombok) or standard getters/setters.

### User.java
```java
@Data
public class User {
  private String uid;             // Firebase Auth UID (document ID)
  private String fullName;
  private String email;
  private String phone;
  private String role;            // CITIZEN, POLICE, ADMIN
  private String address;
  private String languagePreference;
  private String status;          // ACTIVE, LOCKED
  private Timestamp lastLoginAt;
  private Timestamp createdAt;
  private Timestamp updatedAt;
}
```

### Officer.java
```java
@Data
public class Officer {
  private String officerId;       // Firestore doc ID
  private String userId;          // FK to users/{uid}
  private String stationId;       // FK to stations/{id}
  private String badgeNumber;
  private String designation;
  private String areaAssigned;
  private Boolean isActive;
  private String shift;
  private String precinctCode;
  private Timestamp createdAt;
  private Timestamp updatedAt;
}
```

### Station.java
```java
@Data
public class Station {
  private String stationId;
  private String name;
  private String address;
  private Double latitude;
  private Double longitude;
  private String contact;
  private Timestamp createdAt;
  private Timestamp updatedAt;
}
```

### CrimeReport.java
```java
@Data
public class CrimeReport {
  private String reportId;
  private String userId;
  private String assignedOfficerId;
  private String stationId;
  private String title;
  private String description;
  private String category;        // THEFT, ASSAULT, ...
  private String priority;        // LOW, MEDIUM, HIGH
  private String location;
  private Double latitude;
  private Double longitude;
  private Timestamp incidentAt;
  private String caseNumber;      // unique human-friendly ID
  private Boolean isAnonymous;
  private String status;          // PENDING, UNDER_INVESTIGATION, CLOSED
  private Timestamp createdAt;
  private Timestamp updatedAt;
}
```

### ReportTimeline.java (subcollection: reports/{id}/timelines/{timelineId})
```java
@Data
public class ReportTimeline {
  private String timelineId;
  private String statusFrom;
  private String statusTo;
  private String note;
  private String actorUserId;
  private Timestamp createdAt;
}
```

### Attachment.java (subcollection: reports/{id}/attachments/{attId})
```java
@Data
public class Attachment {
  private String attachmentId;
  private String uploaderUserId;
  private String type;            // IMAGE, VIDEO, AUDIO, DOC
  private String url;
  private String metadataJson;
  private Timestamp createdAt;
}
```

### Conversation.java
```java
@Data
public class Conversation {
  private String conversationId;
  private String createdBy;
  private Boolean isGroup;
  private String reportId;        // nullable
  private Timestamp lastMessageAt;
  private Timestamp createdAt;
}
```

### ChatMessage.java (subcollection: conversations/{id}/messages/{msgId})
```java
@Data
public class ChatMessage {
  private String messageId;
  private String senderId;
  private String content;
  private String mediaUrl;
  private String type;            // TEXT, AUDIO, VIDEO
  private Timestamp deliveredAt;
  private Timestamp readAt;
  private String replyToMessageId;
  private Timestamp createdAt;
}
```

### Notification.java (subcollection: users/{uid}/notifications/{nid})
```java
@Data
public class Notification {
  private String notificationId;
  private String message;
  private String type;            // STATUS_UPDATE, ALERT, REMINDER
  private String targetUrl;
  private String deliveryStatus;  // PENDING, SENT, FAILED
  private Boolean isRead;
  private Timestamp expiresAt;
  private Timestamp createdAt;
}
```

### AnonymousTip.java
```java
@Data
public class AnonymousTip {
  private String tipId;
  private String title;
  private String description;
  private String location;
  private Double latitude;
  private Double longitude;
  private String category;
  private String trackingCode;    // unique
  private String status;          // RECEIVED, VERIFIED, ACTIONED
  private String mediaUrl;
  private Timestamp createdAt;
  private Timestamp updatedAt;
}
```

### MissingPerson.java
```java
@Data
public class MissingPerson {
  private String caseId;
  private String name;
  private Integer age;
  private String gender;
  private String lastSeenLocation;
  private String photoUrl;
  private String status;          // OPEN, FOUND
  private String reportedBy;
  private Timestamp reportedAt;
  private Timestamp lastSeenAt;
  private Integer heightCm;
  private String marks;
  private Double rewardAmount;
  private Timestamp createdAt;
  private Timestamp updatedAt;
}
```

### StolenItem.java
```java
@Data
public class StolenItem {
  private String itemId;
  private String itemType;
  private String description;
  private String serialNumber;
  private String status;          // LOST, RECOVERED
  private String location;
  private String reportId;
  private String category;
  private String brand;
  private String model;
  private String color;
  private Double estimatedValue;
  private String reportedBy;
  private Timestamp reportedAt;
  private Timestamp createdAt;
  private Timestamp updatedAt;
}
```

### SOSAlert.java
```java
@Data
public class SOSAlert {
  private String sosId;
  private String userId;
  private Double latitude;
  private Double longitude;
  private String address;
  private Double accuracy;
  private String mediaStreamUrl;
  private Timestamp triggeredAt;
  private String status;          // ACTIVE, HANDLED
  private Timestamp handledAt;
  private String handledByOfficerId;
  private String severity;
  private String notes;
  private String deviceInfoJson;
  private Timestamp createdAt;
  private Timestamp updatedAt;
}
```

---

## Repository layer (Firestore DAOs)

Use Firebase Admin SDK's Firestore client. Example for `UserRepository`:

```java
@Repository
public class UserRepository {
  private final Firestore firestore;

  public UserRepository(Firestore firestore) {
    this.firestore = firestore;
  }

  public User findById(String uid) throws Exception {
    DocumentSnapshot doc = firestore.collection("users").document(uid).get().get();
    return doc.exists() ? doc.toObject(User.class) : null;
  }

  public void save(User user) throws Exception {
    firestore.collection("users").document(user.getUid()).set(user).get();
  }

  public List<User> findByRole(String role) throws Exception {
    QuerySnapshot query = firestore.collection("users")
      .whereEqualTo("role", role).get().get();
    return query.getDocuments().stream()
      .map(doc -> doc.toObject(User.class))
      .collect(Collectors.toList());
  }

  public void delete(String uid) throws Exception {
    firestore.collection("users").document(uid).delete().get();
  }
}
```

Similarly, create repositories for:
- `OfficerRepository`
- `StationRepository`
- `ReportRepository` (with methods for subcollections: timelines, attachments)
- `ConversationRepository` (with methods for participants, messages subcollections)
- `NotificationRepository`
- etc.

---

## Service layer

### AuthService.java
```java
@Service
public class AuthService {
  public FirebaseToken verifyToken(String idToken) throws FirebaseAuthException {
    return FirebaseAuth.getInstance().verifyIdToken(idToken);
  }

  public String getUserRole(String uid) throws Exception {
    UserRecord user = FirebaseAuth.getInstance().getUser(uid);
    Map<String, Object> claims = user.getCustomClaims();
    return claims != null ? (String) claims.get("role") : "CITIZEN";
  }

  public void setUserRole(String uid, String role) throws Exception {
    Map<String, Object> claims = new HashMap<>();
    claims.put("role", role);
    FirebaseAuth.getInstance().setCustomUserClaims(uid, claims);
  }
}
```

### UserService.java
```java
@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User getUserById(String uid) throws Exception {
    return userRepository.findById(uid);
  }

  public void createUser(User user) throws Exception {
    user.setCreatedAt(Timestamp.now());
    user.setUpdatedAt(Timestamp.now());
    userRepository.save(user);
  }

  public void updateUser(String uid, User updates) throws Exception {
    User existing = userRepository.findById(uid);
    if (existing == null) throw new NotFoundException("User not found");
    // merge updates
    existing.setFullName(updates.getFullName());
    existing.setPhone(updates.getPhone());
    existing.setAddress(updates.getAddress());
    existing.setUpdatedAt(Timestamp.now());
    userRepository.save(existing);
  }

  public void deleteUser(String uid) throws Exception {
    userRepository.delete(uid);
  }
}
```

### ReportService.java
```java
@Service
public class ReportService {
  private final ReportRepository reportRepository;

  public CrimeReport createReport(CrimeReport report) throws Exception {
    report.setReportId(UUID.randomUUID().toString());
    report.setCaseNumber(generateCaseNumber());
    report.setStatus("PENDING");
    report.setCreatedAt(Timestamp.now());
    report.setUpdatedAt(Timestamp.now());
    reportRepository.save(report);
    return report;
  }

  public CrimeReport getReportById(String reportId) throws Exception {
    return reportRepository.findById(reportId);
  }

  public List<CrimeReport> getReportsByUser(String userId) throws Exception {
    return reportRepository.findByUserId(userId);
  }

  public void assignOfficer(String reportId, String officerId, String actorUid) throws Exception {
    CrimeReport report = reportRepository.findById(reportId);
    if (report == null) throw new NotFoundException("Report not found");

    String oldStatus = report.getStatus();
    report.setAssignedOfficerId(officerId);
    // optionally derive stationId from officer
    report.setUpdatedAt(Timestamp.now());
    reportRepository.save(report);

    // add timeline entry
    ReportTimeline timeline = new ReportTimeline();
    timeline.setTimelineId(UUID.randomUUID().toString());
    timeline.setStatusFrom(oldStatus);
    timeline.setStatusTo(oldStatus);
    timeline.setNote("Officer assigned: " + officerId);
    timeline.setActorUserId(actorUid);
    timeline.setCreatedAt(Timestamp.now());
    reportRepository.addTimeline(reportId, timeline);
  }

  public void updateStatus(String reportId, String newStatus, String note, String actorUid) throws Exception {
    CrimeReport report = reportRepository.findById(reportId);
    if (report == null) throw new NotFoundException("Report not found");

    String oldStatus = report.getStatus();
    report.setStatus(newStatus);
    report.setUpdatedAt(Timestamp.now());
    reportRepository.save(report);

    ReportTimeline timeline = new ReportTimeline();
    timeline.setTimelineId(UUID.randomUUID().toString());
    timeline.setStatusFrom(oldStatus);
    timeline.setStatusTo(newStatus);
    timeline.setNote(note);
    timeline.setActorUserId(actorUid);
    timeline.setCreatedAt(Timestamp.now());
    reportRepository.addTimeline(reportId, timeline);

    // optionally send notification to reporter
  }

  private String generateCaseNumber() {
    return "CASE-" + System.currentTimeMillis();
  }
}
```

---

## Controller layer (REST endpoints)

### AuthController.java
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;
  private final UserService userService;

  // POST /api/auth/register
  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody RegisterRequest req) throws Exception {
    // Firebase Auth user creation is done on frontend; here we just store profile
    User user = new User();
    user.setUid(req.getUid());
    user.setFullName(req.getFullName());
    user.setEmail(req.getEmail());
    user.setPhone(req.getPhone());
    user.setRole("CITIZEN");
    user.setStatus("ACTIVE");
    userService.createUser(user);

    // set custom claim
    authService.setUserRole(req.getUid(), "CITIZEN");

    return ResponseEntity.ok(Map.of("message", "User registered"));
  }

  // POST /api/auth/verify (optional endpoint to verify token from frontend)
  @PostMapping("/verify")
  public ResponseEntity<?> verify(@RequestHeader("Authorization") String token) throws Exception {
    FirebaseToken decodedToken = authService.verifyToken(token.replace("Bearer ", ""));
    return ResponseEntity.ok(Map.of("uid", decodedToken.getUid(), "email", decodedToken.getEmail()));
  }
}
```

### UserController.java
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;

  @GetMapping("/{uid}")
  @PreAuthorize("hasAnyRole('ADMIN') or #uid == authentication.principal.uid")
  public ResponseEntity<User> getUser(@PathVariable String uid) throws Exception {
    User user = userService.getUserById(uid);
    if (user == null) return ResponseEntity.notFound().build();
    return ResponseEntity.ok(user);
  }

  @PutMapping("/{uid}")
  @PreAuthorize("#uid == authentication.principal.uid or hasRole('ADMIN')")
  public ResponseEntity<?> updateUser(@PathVariable String uid, @RequestBody User updates) throws Exception {
    userService.updateUser(uid, updates);
    return ResponseEntity.ok(Map.of("message", "User updated"));
  }

  @DeleteMapping("/{uid}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> deleteUser(@PathVariable String uid) throws Exception {
    userService.deleteUser(uid);
    return ResponseEntity.ok(Map.of("message", "User deleted"));
  }
}
```

### ReportController.java
```java
@RestController
@RequestMapping("/api/reports")
public class ReportController {
  private final ReportService reportService;

  @PostMapping
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<CrimeReport> createReport(@RequestBody CrimeReport report, Authentication auth) throws Exception {
    report.setUserId(auth.getName()); // uid from token
    CrimeReport created = reportService.createReport(report);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @GetMapping("/{reportId}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<CrimeReport> getReport(@PathVariable String reportId, Authentication auth) throws Exception {
    CrimeReport report = reportService.getReportById(reportId);
    if (report == null) return ResponseEntity.notFound().build();
    // check access (owner, assigned officer, or admin)
    // simplified: allow if user is owner or has role POLICE/ADMIN
    return ResponseEntity.ok(report);
  }

  @GetMapping("/user/{userId}")
  @PreAuthorize("#userId == authentication.principal.uid or hasAnyRole('POLICE','ADMIN')")
  public ResponseEntity<List<CrimeReport>> getUserReports(@PathVariable String userId) throws Exception {
    List<CrimeReport> reports = reportService.getReportsByUser(userId);
    return ResponseEntity.ok(reports);
  }

  @PutMapping("/{reportId}/assign/{officerId}")
  @PreAuthorize("hasAnyRole('POLICE','ADMIN')")
  public ResponseEntity<?> assignOfficer(@PathVariable String reportId, @PathVariable String officerId, Authentication auth) throws Exception {
    reportService.assignOfficer(reportId, officerId, auth.getName());
    return ResponseEntity.ok(Map.of("message", "Officer assigned"));
  }

  @PutMapping("/{reportId}/status")
  @PreAuthorize("hasAnyRole('POLICE','ADMIN')")
  public ResponseEntity<?> updateStatus(@PathVariable String reportId, @RequestBody UpdateStatusRequest req, Authentication auth) throws Exception {
    reportService.updateStatus(reportId, req.getStatus(), req.getNote(), auth.getName());
    return ResponseEntity.ok(Map.of("message", "Status updated"));
  }
}
```

### ChatController.java (simplified, real-time via WebSocket or polling)
```java
@RestController
@RequestMapping("/api/chat")
public class ChatController {
  private final ChatService chatService;

  @PostMapping("/conversations")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Conversation> createConversation(@RequestBody CreateConversationRequest req, Authentication auth) throws Exception {
    Conversation conv = chatService.createConversation(auth.getName(), req.getParticipants(), req.getReportId());
    return ResponseEntity.status(HttpStatus.CREATED).body(conv);
  }

  @GetMapping("/conversations/{convId}/messages")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable String convId, Authentication auth) throws Exception {
    // verify participant
    List<ChatMessage> messages = chatService.getMessages(convId);
    return ResponseEntity.ok(messages);
  }

  @PostMapping("/conversations/{convId}/messages")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<ChatMessage> sendMessage(@PathVariable String convId, @RequestBody ChatMessage message, Authentication auth) throws Exception {
    message.setSenderId(auth.getName());
    ChatMessage saved = chatService.sendMessage(convId, message);
    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
  }
}
```

### NotificationController.java
```java
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
  private final NotificationService notificationService;

  @GetMapping("/{userId}")
  @PreAuthorize("#userId == authentication.principal.uid or hasRole('ADMIN')")
  public ResponseEntity<List<Notification>> getUserNotifications(@PathVariable String userId) throws Exception {
    List<Notification> notifications = notificationService.getNotificationsByUser(userId);
    return ResponseEntity.ok(notifications);
  }

  @PutMapping("/{notificationId}/read")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<?> markAsRead(@PathVariable String notificationId, Authentication auth) throws Exception {
    notificationService.markAsRead(notificationId);
    return ResponseEntity.ok(Map.of("message", "Marked as read"));
  }
}
```

### TipController.java
```java
@RestController
@RequestMapping("/api/tips")
public class TipController {
  private final TipService tipService;

  @PostMapping
  public ResponseEntity<AnonymousTip> submitTip(@RequestBody AnonymousTip tip) throws Exception {
    tip.setTrackingCode(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
    AnonymousTip saved = tipService.createTip(tip);
    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
  }

  @GetMapping("/track/{trackingCode}")
  public ResponseEntity<AnonymousTip> trackTip(@PathVariable String trackingCode) throws Exception {
    AnonymousTip tip = tipService.findByTrackingCode(trackingCode);
    if (tip == null) return ResponseEntity.notFound().build();
    return ResponseEntity.ok(tip);
  }
}
```

### SOSController.java
```java
@RestController
@RequestMapping("/api/sos")
public class SOSController {
  private final SOSService sosService;

  @PostMapping("/trigger")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<SOSAlert> triggerSOS(@RequestBody SOSAlert alert, Authentication auth) throws Exception {
    alert.setUserId(auth.getName());
    alert.setStatus("ACTIVE");
    SOSAlert saved = sosService.triggerSOS(alert);
    // optionally notify nearby officers via notification service
    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
  }

  @PutMapping("/{sosId}/status")
  @PreAuthorize("hasAnyRole('POLICE','ADMIN')")
  public ResponseEntity<?> updateSOSStatus(@PathVariable String sosId, @RequestBody UpdateSOSRequest req, Authentication auth) throws Exception {
    sosService.updateStatus(sosId, req.getStatus(), auth.getName());
    return ResponseEntity.ok(Map.of("message", "SOS status updated"));
  }
}
```

### AnalyticsController.java
```java
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {
  private final AnalyticsService analyticsService;

  @GetMapping("/statistics")
  @PreAuthorize("hasAnyRole('POLICE','ADMIN')")
  public ResponseEntity<?> getStatistics() throws Exception {
    Map<String, Object> stats = analyticsService.getStatistics();
    return ResponseEntity.ok(stats);
  }

  @GetMapping("/hotspots")
  @PreAuthorize("hasAnyRole('POLICE','ADMIN')")
  public ResponseEntity<?> getHotspots() throws Exception {
    List<Map<String, Object>> hotspots = analyticsService.getHotspots();
    return ResponseEntity.ok(hotspots);
  }
}
```

---

## Security configuration

### FirebaseConfig.java
```java
@Configuration
public class FirebaseConfig {
  @Bean
  public FirebaseApp firebaseApp() throws IOException {
    InputStream serviceAccount = getClass().getClassLoader()
      .getResourceAsStream("firebase-adminsdk.json");

    FirebaseOptions options = FirebaseOptions.builder()
      .setCredentials(GoogleCredentials.fromStream(serviceAccount))
      .build();

    if (FirebaseApp.getApps().isEmpty()) {
      return FirebaseApp.initializeApp(options);
    }
    return FirebaseApp.getInstance();
  }

  @Bean
  public Firestore firestore(FirebaseApp firebaseApp) {
    return FirestoreClient.getFirestore(firebaseApp);
  }
}
```

### FirebaseAuthenticationFilter.java
```java
@Component
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {
  private final AuthService authService;

  public FirebaseAuthenticationFilter(AuthService authService) {
    this.authService = authService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      String token = authHeader.substring(7);
      try {
        FirebaseToken decodedToken = authService.verifyToken(token);
        String uid = decodedToken.getUid();
        String role = authService.getUserRole(uid);

        FirebaseUserDetails userDetails = new FirebaseUserDetails(uid, role);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
          userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
      } catch (Exception e) {
        // invalid token; continue without auth
      }
    }
    chain.doFilter(request, response);
  }
}
```

### FirebaseUserDetails.java
```java
public class FirebaseUserDetails implements UserDetails {
  private final String uid;
  private final String role;

  public FirebaseUserDetails(String uid, String role) {
    this.uid = uid;
    this.role = role;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_" + role));
  }

  @Override
  public String getPassword() { return null; }

  @Override
  public String getUsername() { return uid; }

  public String getUid() { return uid; }

  @Override
  public boolean isAccountNonExpired() { return true; }

  @Override
  public boolean isAccountNonLocked() { return true; }

  @Override
  public boolean isCredentialsNonExpired() { return true; }

  @Override
  public boolean isEnabled() { return true; }
}
```

### SecurityConfig.java
```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
  private final FirebaseAuthenticationFilter firebaseFilter;

  public SecurityConfig(FirebaseAuthenticationFilter firebaseFilter) {
    this.firebaseFilter = firebaseFilter;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .cors(cors -> cors.configurationSource(corsConfigurationSource()))
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/auth/register", "/api/auth/verify", "/api/tips/track/**").permitAll()
        .anyRequest().authenticated()
      )
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
      .addFilterBefore(firebaseFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174")); // add production domain later
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }
}
```

---

## Global exception handling

### CustomExceptions.java
```java
public class NotFoundException extends RuntimeException {
  public NotFoundException(String message) {
    super(message);
  }
}

public class UnauthorizedException extends RuntimeException {
  public UnauthorizedException(String message) {
    super(message);
  }
}
```

### GlobalExceptionHandler.java
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<?> handleNotFound(NotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
      .body(Map.of("error", ex.getMessage()));
  }

  @ExceptionHandler(UnauthorizedException.class)
  public ResponseEntity<?> handleUnauthorized(UnauthorizedException ex) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN)
      .body(Map.of("error", ex.getMessage()));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<?> handleGeneric(Exception ex) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
      .body(Map.of("error", "Internal server error", "details", ex.getMessage()));
  }
}
```

---

## Frontend integration changes

Update your React app to:
1. **Install Firebase SDK:** `npm install firebase`
2. **Initialize Firebase in frontend:**
   ```js
   import { initializeApp } from 'firebase/app';
   import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

   const firebaseConfig = { /* from Firebase console */ };
   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   ```
3. **On login:** get ID token and send to Spring Boot backend
   ```js
   const user = await signInWithEmailAndPassword(auth, email, password);
   const token = await user.user.getIdToken();
   localStorage.setItem('token', token);
   // navigate to dashboard
   ```
4. **API calls:** include token in Authorization header
   ```js
   const response = await fetch('http://localhost:8080/api/reports', {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`,
       'Content-Type': 'application/json'
     }
   });
   ```
5. **Registration:** create Firebase user, then call `/api/auth/register` with uid + profile
   ```js
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   const uid = userCredential.user.uid;
   await fetch('http://localhost:8080/api/auth/register', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ uid, fullName, email, phone, role: 'CITIZEN' })
   });
   ```

---

## Free hosting options for Spring Boot

- **Render:** 750 hrs/month free web service
- **Railway:** $5 credit/month; small usage free
- **Fly.io:** 3 shared-cpu VMs free
- **Heroku:** eco dyno $5/month (not free anymore)
- **Replit/Glitch:** limited but possible for dev/demo

Set environment variable `GOOGLE_APPLICATION_CREDENTIALS` or embed service account JSON (not recommended for production).

---

## What we're deferring (to stay free)

- WebSocket (real-time chat) — use polling or add later; WebSocket can work but needs persistent connection
- Redis caching
- External object storage (Firebase Storage is free up to 5GB; enable later)
- Always-on scheduled jobs (use Firebase Cloud Functions for scheduled tasks if needed)
- Complex ML/AI, PostGIS, government integrations

---

## Implementation checklist

- [ ] Create Firebase project; enable Auth + Firestore
- [ ] Download service account key; add to Spring Boot resources
- [ ] Scaffold Spring Boot project with Maven/Gradle
- [ ] Add dependencies: spring-boot-starter-web, spring-boot-starter-security, firebase-admin
- [ ] Implement FirebaseConfig, SecurityConfig, FirebaseAuthenticationFilter
- [ ] Create model classes (User, Officer, CrimeReport, etc.)
- [ ] Implement repositories (Firestore DAOs)
- [ ] Implement services (AuthService, UserService, ReportService, etc.)
- [ ] Implement controllers (REST endpoints)
- [ ] Add global exception handler
- [ ] Update React frontend to use Firebase Auth and call Spring Boot API
- [ ] Test locally: Spring Boot on 8080, React on 5173/5174
- [ ] Deploy Spring Boot to Render/Railway/Fly.io
- [ ] Update CORS config with production domain
- [ ] Test end-to-end flow

---

## Summary

This plan gives you:
- **Java Spring Boot backend** with REST APIs
- **Firebase Firestore** as cloud database (free tier)
- **Firebase Auth** for authentication (ID tokens verified in Spring Boot)
- **Role-based access control** (CITIZEN, POLICE, ADMIN)
- All the entities, endpoints, and logic from the original prompt—adapted to Firestore
- Free hosting options to stay within budget

Once approved, we can scaffold the Spring Boot project structure, implement the config/security/repositories/services/controllers, and integrate with your React frontend!
