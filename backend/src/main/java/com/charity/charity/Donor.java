package com.charity.charity;

public class Donor {

    private String donor_email;
    private String donor_name;
    private String beneficiary_name;
    private String campId;

    public Donor() {
        // Default constructor
    }


    public Donor(String email, String name, String beneficiary, String campId) {
        this.donor_email=email;
        this.donor_name=name;
        this.beneficiary_name=beneficiary;
        this.campId=campId;
    }

    public String getDonor_email() {
        return donor_email;
    }

    public void setDonor_email(String demail) {
        this.donor_email = demail;
    }

    public String getDonor_name() {
        return donor_name;
    }

    public void setDonor_name(String donor_name) {
        this.donor_name = donor_name;
    }

    public void setBeneficiary_name(String beneficiary_name) {
        this.beneficiary_name = beneficiary_name;
    }

    public String getBeneficiary_name() {
        return beneficiary_name;
    }
}
