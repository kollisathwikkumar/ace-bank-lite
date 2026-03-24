package com.acebank.lite.controllers;

import com.acebank.lite.dao.BankUserDao;
import com.acebank.lite.dao.BankUserDaoImpl;
import com.acebank.lite.util.MailUtil;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.*;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * POST /api/otp/send
 * Body: { "email": "user@example.com" }
 * Generates a 6-digit OTP and sends it to the user's registered email.
 */
@WebServlet("/api/otp/send")
public class ApiOtpSend extends HttpServlet {

    private static final Logger log = Logger.getLogger(ApiOtpSend.class.getName());
    private final Gson gson = new Gson();

    // Shared OTP store: email -> OtpEntry (accessible by ApiOtpVerify)
    static final ConcurrentHashMap<String, OtpEntry> otpStore = new ConcurrentHashMap<>();

    static class OtpEntry {
        final String otp;
        final long expiresAt;
        final int accountNumber;

        OtpEntry(String otp, long expiresAt, int accountNumber) {
            this.otp = otp;
            this.expiresAt = expiresAt;
            this.accountNumber = accountNumber;
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        setCorsHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    private void setCorsHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        setCorsHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        JsonObject responseJson = new JsonObject();
        PrintWriter out = resp.getWriter();

        try {
            String body = req.getReader().lines().collect(Collectors.joining());
            JsonObject requestBody = gson.fromJson(body, JsonObject.class);

            if (requestBody == null || !requestBody.has("email")) {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "Email is required");
                out.print(gson.toJson(responseJson));
                return;
            }

            String email = requestBody.get("email").getAsString().trim().toLowerCase();

            // 1. Look up account by email
            BankUserDao userDao = new BankUserDaoImpl();
            Optional<Integer> accOpt = userDao.getAccountByEmail(email);

            if (accOpt.isEmpty()) {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "No account found with this email");
                out.print(gson.toJson(responseJson));
                return;
            }

            int accountNumber = accOpt.get();

            // 2. Generate 6-digit OTP
            String otp = String.valueOf(100000 + (int) (Math.random() * 900000));

            // 3. Store OTP with 5-minute expiry
            long expiresAt = System.currentTimeMillis() + 5 * 60 * 1000;
            otpStore.put(email, new OtpEntry(otp, expiresAt, accountNumber));

            // 4. Send OTP email
            String subject = "ACE Bank — Your Login OTP";
            String emailBody = "Dear Customer,\n\n"
                    + "Your One-Time Password (OTP) for ACE Bank login is:\n\n"
                    + "    " + otp + "\n\n"
                    + "This OTP is valid for 5 minutes. Do not share it with anyone.\n\n"
                    + "If you did not request this, please ignore this email.\n\n"
                    + "Regards,\n"
                    + "ACE Bank Security Team";

            MailUtil.sendMailAsync(email, subject, emailBody);

            log.info("OTP generated for " + email + " → " + otp);

            responseJson.addProperty("success", true);
            responseJson.addProperty("message", "OTP sent to your email");

        } catch (JsonSyntaxException e) {
            responseJson.addProperty("success", false);
            responseJson.addProperty("message", "Invalid JSON");
        } catch (Exception e) {
            log.severe("OTP send error: " + e.getMessage());
            responseJson.addProperty("success", false);
            responseJson.addProperty("message", "Server error. Please try again.");
        }

        out.print(gson.toJson(responseJson));
    }
}
