package com.charity.charity;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);

    private static boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }

    @PostMapping("/notify")
    public void sendNotification(@RequestBody NotificationRequest request) {
        String email = request.getEmail();
        String status = request.getStatus();
        if (!isValidEmail(email)) {
            logger.error("Invalid email address: {}", email);
            return;
        }
        try {
            Properties properties = new Properties();
            properties.put("mail.smtp.auth", "true");
            properties.put("mail.smtp.starttls.enable", "true");
            properties.put("mail.smtp.host", "smtp.gmail.com");
            properties.put("mail.smtp.port", "587");

            Session session = Session.getInstance(properties);

            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress("omkargouda306@gmail.com"));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
            message.setSubject("Campaign Status Notification");

            if (status.equals("approved")) {
                message.setText("Your campaign has been approved by the admin.");
            } else if (status.equals("rejected")) {
                message.setText("Your campaign has been rejected by the admin.");
            } else {
                // Handle unexpected status values
                message.setText("Your campaign status is: " + status);
            }

            Transport transport = session.getTransport("smtp");
            transport.connect("smtp.gmail.com", "omkargouda306@gmail.com", "");
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();

            logger.info("Notification sent to {}", email);
        } catch (Exception e) {
            logger.error("Unexpected error occurred while sending notification to {}", email, e);
        }
    }

    private static class NotificationRequest {
        private String email;
        private String status;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
