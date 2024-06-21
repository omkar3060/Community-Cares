package com.charity.charity;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.web.multipart.MultipartFile;

@Document(collection = "pending")
public class Campaign {
    @Id
    private String id;
    private String name;
    private String description;
    private String beneficiaryAddress;
    private double goalAmount;
    private String status; // Add status field
    private String email;
    private String campId;
private double raisedAmount;
    @Field("image")
    private byte[] image; // Add image field
    // Constructors, getters, setters


    // Constructors
    public Campaign() {
        // Default constructor
    }

    public Campaign(String id,String name, String description, String beneficiaryAddress, double goalAmount, String email) {
        this.name = name;
        this.description = description;
        this.beneficiaryAddress = beneficiaryAddress;
        this.goalAmount = goalAmount;
        this.status = "pending"; // Set default status to pending
        this.email=email;
        this.image = image;
        this.campId=id;

    }


    public String getCampId() {
        return campId;
    }

    public void setCampId(String campId) {
        this.campId = campId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBeneficiaryAddress() {
        return beneficiaryAddress;
    }

    public void setBeneficiaryAddress(String beneficiaryAddress) {
        this.beneficiaryAddress = beneficiaryAddress;
    }

    public double getGoalAmount() {
        return goalAmount;
    }

    public void setGoalAmount(double goalAmount) {
        this.goalAmount = goalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public void setRaisedAmount(double i) {
        this.raisedAmount=i;
    }

    public double getRaisedAmount() {
        return raisedAmount;
    }
}
