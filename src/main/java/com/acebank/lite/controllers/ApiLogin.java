package com.acebank.lite.controllers;

import com.acebank.lite.dao.BankUserDao;
import com.acebank.lite.dao.BankUserDaoImpl;
import com.acebank.lite.models.LoginResult;
import com.acebank.lite.service.BankService;
import com.acebank.lite.service.BankServiceImpl;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Optional;

@WebServlet("/api/login")
public class ApiLogin extends HttpServlet {

    private final BankService bankService = new BankServiceImpl();
    private final BankUserDao userDao = new BankUserDaoImpl();
    private final Gson gson = new Gson();

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setCorsHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setCorsHeaders(resp);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        JsonObject responseJson = new JsonObject();

        try {
            // 1. Read JSON Body
            StringBuilder sb = new StringBuilder();
            try (BufferedReader reader = req.getReader()) {
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line);
                }
            }

            JsonObject requestBody = gson.fromJson(sb.toString(), JsonObject.class);

            if (requestBody == null || (!requestBody.has("email") && !requestBody.has("phone"))
                    || !requestBody.has("password")) {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "Email or phone, and password are required");
                out.print(gson.toJson(responseJson));
                return;
            }

            String password = requestBody.get("password").getAsString();

            // 2. Lookup account by email or phone
            Optional<Integer> accOpt;
            if (requestBody.has("phone") && !requestBody.get("phone").getAsString().isEmpty()) {
                String phone = requestBody.get("phone").getAsString();
                accOpt = userDao.getAccountByPhone(phone);
            } else {
                String email = requestBody.get("email").getAsString();
                accOpt = userDao.getAccountByEmail(email);
            }

            if (accOpt.isPresent()) {
                int accountNo = accOpt.get();

                // 3. Authenticate via Service
                Optional<LoginResult> loginResultOpt = bankService.authenticate(accountNo, password);

                if (loginResultOpt.isPresent()) {
                    LoginResult details = loginResultOpt.get();
                    responseJson.addProperty("success", true);
                    responseJson.addProperty("accountNumber", accountNo);
                    responseJson.addProperty("firstName", details.firstName());
                    responseJson.addProperty("lastName", details.lastName());
                    responseJson.addProperty("email", details.email());
                    responseJson.addProperty("balance", details.balance());
                } else {
                    responseJson.addProperty("success", false);
                    responseJson.addProperty("message", "Incorrect credentials.");
                }
            } else {
                responseJson.addProperty("success", false);
                responseJson.addProperty("message", "Account not found. Please check your email or phone.");
            }

        } catch (JsonSyntaxException e) {
            responseJson.addProperty("success", false);
            responseJson.addProperty("message", "Invalid JSON payload");
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } catch (Exception e) {
            responseJson.addProperty("success", false);
            responseJson.addProperty("message", "Internal server error: " + e.getMessage());
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        out.print(gson.toJson(responseJson));
        out.flush();
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
}
