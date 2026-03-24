package com.acebank.lite.util;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.java.Log;

import java.util.Properties;
import java.util.concurrent.CompletableFuture;

@Log
public class MailUtil {

    public static void sendMailAsync(String recipient, String subject, String body) {
        CompletableFuture.runAsync(() -> {
            try {
                sendMail(recipient, subject, body);
            } catch (Exception e) {
                log.warning("Background email failed: " + e.getMessage());
            }
        });
    }

    public static boolean sendMail(final String recipient, String subject, String body) {
        log.info("Attempting to send email to: " + recipient);

        try {
            Session session = Session.getInstance(getSmtpConfig(), new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(
                            ConfigLoader.getProperty(ConfigKeys.MAIL_ADDR),
                            ConfigLoader.getProperty(ConfigKeys.MAIL_PWD)
                    );
                }
            });

            Message message = new MimeMessage(session);
            String fromAddr = ConfigLoader.getProperty(ConfigKeys.MAIL_ADDR);

            message.setFrom(new InternetAddress(fromAddr, "AceBank Support"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));
            message.setSubject(subject);
            message.setText(body);

            Transport.send(message);
            log.info("Email sent successfully to " + recipient);
            return true;

        } catch (Exception e) {
            log.severe("Failed to send email: " + e.getMessage());
            return false;
        }
    }

    private static Properties getSmtpConfig() {
        Properties props = new Properties();

        // Standard SMTP properties
        props.put("mail.smtp.host", ConfigLoader.getProperty(ConfigKeys.MAIL_SMTP_HOST));
        props.put("mail.smtp.port", ConfigLoader.getProperty(ConfigKeys.MAIL_SMTP_PORT));
        props.put("mail.smtp.auth", ConfigLoader.getProperty(ConfigKeys.MAIL_SMTP_AUTH));
        props.put("mail.smtp.starttls.enable", ConfigLoader.getProperty(ConfigKeys.MAIL_SMTP_STARTTLS));
        // Jakarta Mail expects "mail.smtp.connectiontimeout" (no hyphen)
        props.put("mail.smtp.connectiontimeout", ConfigLoader.getProperty(ConfigKeys.MAIL_SMTP_CONN_TIMEOUT));
        props.put("mail.smtp.timeout", ConfigLoader.getProperty(ConfigKeys.MAIL_SMTP_TIMEOUT));

        return props;
    }
}