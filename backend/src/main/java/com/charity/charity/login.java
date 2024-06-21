package com.charity.charity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "login")
public class login {

    @Id
    private String id;

    private String email;
    private String password;
    private String name;
    private String PhoneNo;

    @Autowired


    public login(String email,String password,String name,String PhoneNo) {
        this.password = password;
        this.email=email;
        this.name=name;
        this.PhoneNo=PhoneNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName(){return name;}

    public void setName(String name){this.name=name;}

    public String getPhoneNo(){return PhoneNo;}

    public void setPhoneNo(String PhoneNo){this.PhoneNo=PhoneNo;}

}
