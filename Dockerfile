# Use Eclipse Temurin 17 as base image (replaces deprecated openjdk)
FROM eclipse-temurin:17-jdk-jammy

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy all files (including pom.xml, src, and resources)
COPY . .

# Debug: List files to verify they're copied
RUN ls -la && ls -la src/ || true

# Build the application
RUN mvn clean package -DskipTests

# Expose port (Render will override this with PORT env variable)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "target/crimenet-backend-1.0.0.jar"]
