package com.acebank.lite.controllers;

import com.acebank.lite.util.ConnectionManager;
import com.acebank.lite.util.QueryLoader;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.*;
import java.math.BigDecimal;
import java.sql.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

/**
 * POST /api/balance
 * Body: { "accountNumber": 123, "amount": 5000, "type": "credit"|"debit" }
 * Persists balance changes to the database.
 */
@WebServlet("/api/balance")
public class ApiBalance extends HttpServlet {

    private static final Logger log = Logger.getLogger(ApiBalance.class.getName());
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        JsonObject responseJson = new JsonObject();
        PrintWriter out = resp.getWriter();

        try {
            String body = req.getReader().lines().collect(Collectors.joining());
            JsonObject requestBody = gson.fromJson(body, JsonObject.class);

            if (requestBody == null || !requestBody.has("accountNumber") ||
                    !requestBody.has("amount") || !requestBody.has("type")) {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "accountNumber, amount, and type are required");
                out.print(gson.toJson(responseJson));
                return;
            }

            int accountNumber = requestBody.get("accountNumber").getAsInt();
            BigDecimal amount = requestBody.get("amount").getAsBigDecimal();
            String type = requestBody.get("type").getAsString();

            if (amount.compareTo(BigDecimal.ZERO) <= 0) {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "Amount must be positive");
                out.print(gson.toJson(responseJson));
                return;
            }

            Connection conn = ConnectionManager.getConnection();
            String sql;
            boolean success;

            if ("credit".equals(type)) {
                sql = QueryLoader.get("account.deposit");
                try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                    pstmt.setBigDecimal(1, amount);
                    pstmt.setInt(2, accountNumber);
                    success = pstmt.executeUpdate() > 0;
                }
            } else if ("debit".equals(type)) {
                sql = QueryLoader.get("account.withdraw");
                try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                    pstmt.setBigDecimal(1, amount);
                    pstmt.setInt(2, accountNumber);
                    pstmt.setBigDecimal(3, amount);
                    success = pstmt.executeUpdate() > 0;
                }
            } else {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "type must be 'credit' or 'debit'");
                out.print(gson.toJson(responseJson));
                return;
            }

            if (success) {
                // Fetch updated balance
                String balSql = QueryLoader.get("account.get_balance");
                try (PreparedStatement pstmt = conn.prepareStatement(balSql)) {
                    pstmt.setInt(1, accountNumber);
                    try (ResultSet rs = pstmt.executeQuery()) {
                        if (rs.next()) {
                            responseJson.addProperty("success", true);
                            responseJson.addProperty("balance", rs.getBigDecimal("BALANCE"));
                        }
                    }
                }
            } else {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "Insufficient balance or account not found");
            }

            conn.close();
        } catch (JsonSyntaxException e) {
            responseJson.addProperty("success", false);
            responseJson.addProperty("message", "Invalid JSON");
        } catch (SQLException e) {
            log.severe("Balance update error: " + e.getMessage());
            responseJson.addProperty("success", false);
            responseJson.addProperty("message", "Database error");
        }

        out.print(gson.toJson(responseJson));
    }
}
