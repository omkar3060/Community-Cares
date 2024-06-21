package com.charity.charity;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class mailstructure {

    private String subject;
    private String message;

    public mailstructure(String subject,String message) {
        this.subject= subject;
        this.message=message;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
