package com.charity.charity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/totalRaisedAmount")
public class TotalRaisedAmountController {

    private final TotalRaisedAmountRepository totalRaisedAmountRepository;

    @Autowired
    public TotalRaisedAmountController(TotalRaisedAmountRepository totalRaisedAmountRepository) {
        this.totalRaisedAmountRepository = totalRaisedAmountRepository;
    }

    @GetMapping
    public ResponseEntity<?> getTotalRaisedAmount() {
        try {
            // Assuming you have a method to fetch the total raised amount from the repository
            TotalRaisedAmount totalRaisedAmount = totalRaisedAmountRepository.findAll().stream().findFirst().orElse(null);
            if (totalRaisedAmount != null) {
                return ResponseEntity.ok(totalRaisedAmount);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching total raised amount: " + e.getMessage());
        }
    }
}

