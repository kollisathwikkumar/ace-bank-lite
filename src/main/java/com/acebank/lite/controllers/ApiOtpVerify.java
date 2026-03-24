package com.acebank.lite.controllers;

import com.acebank.lite.dao.BankUserDao;
import com.acebank.lite.dao.BankUserDaoImpl;
import com.acebank.lite.models.LoginResult;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * POST /api/otp/verify
 * Body: { "email": "user@example.com", "otp": "123456" }
 * Verifies the OTP and logs the user in (returns same data as /api/login).
 */
@WebServlet("/api/otp/verify")
public class ApiOtpVerify extends HttpServlet {

    private static final Logger log = Logger.getLogger(ApiOtpVerify.class.getName());
    private final Gson gson = new Gson();

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

            if (requestBody == null || !requestBody.has("email") || !requestBody.has("otp")) {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "Email and OTP are required");
                out.print(gson.toJson(responseJson));
                return;
            }

            String email = requestBody.get("email").getAsString().trim().toLowerCase();
            String otp = requestBody.get("otp").getAsString().trim();

            // 1. Look up stored OTP
            ApiOtpSend.OtpEntry entry = ApiOtpSend.otpStore.get(email);

            if (entry == null) {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "No OTP found. Please request a new one.");
                out.print(gson.toJson(responseJson));
                return;
            }

            // 2. Check expiry
            if (System.currentTimeMillis() > entry.expiresAt) {
                ApiOtpSend.otpStore.remove(email);
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "OTP has expired. Please request a new one.");
                out.print(gson.toJson(responseJson));
                return;
            }

            // 3. Verify OTP
            if (!entry.otp.equals(otp)) {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "Invalid OTP. Please try again.");
                out.print(gson.toJson(responseJson));
                return;
            }

            // 4. OTP is valid — remove it and fetch user details
            ApiOtpSend.otpStore.remove(email);

            BankUserDao userDao = new BankUserDaoImpl();
            LoginResult details = userDao.getUserDetails(entry.accountNumber);

            responseJson.addProperty("success", true);
            responseJson.addProperty("accountNumber", entry.accountNumber);
            responseJson.addProperty("firstName", details.firstName());
            responseJson.addProperty("lastName", details.lastName());
            responseJson.addProperty("email", details.email());
            responseJson.addProperty("balance", details.balance());

            log.info("OTP login successful for " + email);

        } catch (JsonSyntaxException e) {
            responseJson.addProperty("success", false);
            responseJson.addProperty("message", "Invalid JSON");
        } catch (Exception e) {
            log.severe("OTP verify error: " + e.getMessage());
            responseJson.addProperty("success", false);
            responseJson.addProperty("message", "Server error. Please try again.");
        }

        out.print(gson.toJson(responseJson));
    }
}
