# ACE Bank Lite

A lightweight, modern digital banking application with a Java Servlet backend, MySQL database, and responsive frontend.

## Features
- **Account Management:** Zero-balance savings accounts with instant creation
- **Transactions:** Instant transfers and deposits
- **Security:** Password hashing, OTP-based login recovery, and proper session management
- **Email Notifications:** Automatic emails for account creation and OTPs
- **Analytics:** Real-time dashboards with visual analytics

## Tech Stack
- **Backend:** Java 21, Jakarta Servlets, Maven, Tomcat 10
- **Database:** MySQL 8, MyBatis
- **Frontend:** HTML5, CSS3, DOM JS, Fetch API
- **Dependencies:** Gson, BCrypt, Jakarta Mail 

## Prerequisites
1. **Java 21+**
2. **Apache Tomcat 10.x** (Required for Jakarta EE namespaces)
3. **MySQL 8.x**
4. **Maven**

## Setup Instructions

### 1. Database Setup
Create the MySQL database:
```sql
CREATE DATABASE acebank_lite;
```

The application will automatically create the required tables (`USERS`, `ACCOUNTS`, `TRANSACTIONS`) on first run using the `schema_initializer.sql` script.

### 2. Configuration
The application requires database and SMTP configuration.
Configuration is managed via `src/main/resources/application-dev.properties`.

Since this file contains sensitive credentials, it is included in `.gitignore`. A template file is provided.
1. Copy the template:
```bash
cp src/main/resources/application-dev.properties.template src/main/resources/application-dev.properties
```
2. Edit `application-dev.properties` to add your MySQL root credentials and Gmail App Password for SMTP.

### 3. Build the Project
Use Maven to compile and package the WAR file:
```bash
mvn clean package
```
This will generate `LaceBank.war` in the `target/` directory.

### 4. Deploy to Tomcat
Deploy the generated WAR to Apache Tomcat:
```bash
cp target/LaceBank.war /path/to/tomcat/webapps/
```
Start Tomcat and access the application at: `http://localhost:8080/LaceBank/`

## API Endpoints
- `POST /api/signup` : Register a new user
- `POST /api/login` : Login via email/phone and password
- `POST /api/otp/send` : Send OTP to email
- `POST /api/otp/verify` : Verify OTP and login
- `POST /api/balance` : Execute a transaction
- `GET /api/transactions` : Fetch transaction history
- `GET /api/analytics` : Get account analytics
