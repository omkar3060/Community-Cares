package com.charity.charity;

import com.charity.charity.login;
import com.charity.charity.studentrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.logging.Logger;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class mycontroller {

    private static final Logger logger = Logger.getLogger(mycontroller.class.getName());

    @Autowired
    private studentrepository studentRepository;

    @PostMapping("/")
    public ResponseEntity<?> addUser(@RequestBody login login) {
        login save = this.studentRepository.save(login);
        return ResponseEntity.ok(save);
    }

    @GetMapping("/")
    public ResponseEntity<?> getUser() {
        return ResponseEntity.ok(this.studentRepository.findAll());
    }

    @GetMapping("/count/users")
    public long getTotalUser() {
        return studentRepository.count();
    }

    // New endpoint to check if email is already registered
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        boolean isRegistered = studentRepository.existsByEmail(email);
        return ResponseEntity.ok(isRegistered);
    }


    @PostMapping("/validate-password")
    public ResponseEntity<?> validatePassword(@RequestBody login loginRequest) {
        // Retrieve user by email
        String email = loginRequest.getEmail();
        login user = studentRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        // Compare passwords
        if (user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Password is correct");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }
    }

    @PostMapping(("/reset-password"))
    public ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String password) {
        // Retrieve user by email
        login user  = studentRepository.findByEmail(email);

        logger.info("User: " + user);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        user.setPassword(password);
        logger.info("User: " + user.getPassword());
        studentRepository.save(user);
        logger.info("User: " + user.getClass());

        return ResponseEntity.ok("Password reset successful for email: " + user.getEmail());
    }

    @GetMapping("/user-profile/{email}")
    public ResponseEntity<?> getUserProfile(@PathVariable String email) {
        logger.info("Received request to get user profile for email: " + email);
        login user = studentRepository.findByEmail(email);

        if (user == null) {
            logger.warning("User not found for email: " + email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        logger.info("User profile fetched successfully for email: " + email);
        return ResponseEntity.ok(user);
    }

    // Endpoint to update user profile
    @PutMapping("/update-profile/{email}")
    public ResponseEntity<?> updateUserProfile(@PathVariable String email, @RequestBody login updatedLogin) {
        logger.info("Received request to update user profile for email: " + email);
        login user = studentRepository.findByEmail(email);

        if (user == null) {
            logger.warning("User not found for email: " + email);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        logger.info("Updating user profile for email: " + email);
        user.setName(updatedLogin.getName());
        user.setPhoneNo(updatedLogin.getPhoneNo());
        studentRepository.save(user);

        logger.info("User profile updated successfully for email: " + email);
        return ResponseEntity.ok("User profile updated successfully");
    }
}
