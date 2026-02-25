<%-- Created by IntelliJ IDEA. User: suman Date: 08-02-2026 Time: 11:56 To change this template use File | Settings |
    File Templates. --%>
    <%@ page contentType="text/html;charset=UTF-8" language="java" %>
        <!DOCTYPE html>
        <html>

        <head>
            <title>${errorTitle} - AceBank</title>
            <style>
                body {
                    font-family: 'Segoe UI', sans-serif;
                    text-align: center;
                    padding-top: 100px;
                    color: #333;
                }

                .error-box {
                    border: 1px solid #ddd;
                    display: inline-block;
                    padding: 40px;
                    border-radius: 10px;
                    background: #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .code {
                    font-size: 72px;
                    color: #e74c3c;
                    margin: 0;
                }

                h2 {
                    margin-top: 0;
                }

                .msg {
                    color: #666;
                    margin-bottom: 20px;
                }

                .btn {
                    text-decoration: none;
                    background: #3498db;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                }
            </style>
        </head>

        <body>

            <div class="error-box">
                <p class="code">${errorCode}</p>
                <h2>${errorTitle}</h2>
                <p class="msg">${errorMessage}</p>
                <a href="${pageContext.request.contextPath}/home" class="btn">Return to Secure Dashboard</a>
            </div>
        </body>

        </html>