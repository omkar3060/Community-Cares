package com.charity.charity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "total_raised_amount")
public class TotalRaisedAmount {
    @Id
    private String id;
    private double totalAmount;

    // Constructors
    public TotalRaisedAmount() {
        // Default constructor
    }

    public TotalRaisedAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
