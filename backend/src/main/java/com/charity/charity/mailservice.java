package com.charity.charity;


import com.charity.charity.mailstructure;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class mailservice {

    @Autowired
    private MailSender mailSender;

    @Value("$(spring.mail.username)")
    private String fromMail;

    public void sendMail(String mail, mailstructure mailStructure)
    {

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setFrom(fromMail);
        simpleMailMessage.setSubject(mailStructure.getSubject());
        simpleMailMessage.setText(mailStructure.getMessage());
        simpleMailMessage.setTo(mail);
        System.out.println(simpleMailMessage.getText());
        mailSender.send(simpleMailMessage);

    }
}
