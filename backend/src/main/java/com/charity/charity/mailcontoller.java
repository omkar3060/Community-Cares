package com.charity.charity;
import com.charity.charity.mailstructure;
import com.charity.charity.mailservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/mail")
@CrossOrigin(origins = "http://localhost:3000")
public class mailcontoller {



    @Autowired

    private mailservice mailService;
    @PostMapping("/send/{mail}")
    public ResponseEntity<String> sendMail(@PathVariable String mail , @RequestBody mailstructure mailStructure){
        mailService.sendMail(mail,mailStructure);

        return ResponseEntity.ok().body("{\"status\": \"success\"}");


    }
}
