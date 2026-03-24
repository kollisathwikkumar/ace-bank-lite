# 1. Build stage using Maven
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Build the WAR file
RUN mvn clean package -DskipTests

# 2. Production stage using Tomcat 10 (Jakarta EE 10 compatible)
FROM tomcat:10.1-jdk21

# Remove default ROOT application to make ACE Bank the root app
RUN rm -rf /usr/local/tomcat/webapps/ROOT

# Copy the built WAR file from the build stage to Tomcat's webapps directory 
# We name it ROOT.war so it serves at the base path (e.g., https://yourapp.com/ instead of https://yourapp.com/LaceBank/)
COPY --from=build /app/target/LaceBank.war /usr/local/tomcat/webapps/ROOT.war

# Expose Tomcat's default port
EXPOSE 8080

# Start Tomcat server
CMD ["catalina.sh", "run"]
