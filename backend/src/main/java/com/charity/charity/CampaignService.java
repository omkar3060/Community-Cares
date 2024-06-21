package com.charity.charity;

import java.util.UUID;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private AcceptedCampaignRepository acceptedCampaignRepository;

    @Autowired
    private RejectedCampaignRepository rejectedCampaignRepository;

    @Autowired
    private Donorrepository donorrepository;

    public Campaign createCampaign(@NotNull Campaign campaign) {
        String generatedCampId = generateUniqueId();
        System.out.println("Generated CampId: " + generatedCampId);
        campaign.setCampId(generatedCampId);
        campaign.setStatus("pending");
        campaign.setRaisedAmount(0);
        return campaignRepository.save(campaign);
    }

    private String generateUniqueId() {
        return UUID.randomUUID().toString();
    }

    public List<AcceptedCampaign> getAllAcceptedCampaigns() {
//        System.out.print(acceptedCampaignRepository.count());
        return acceptedCampaignRepository.findAll();
    }

    public long getNumberOfAcceptedCampaigns() {
        return acceptedCampaignRepository.count();
    }

    public List<AcceptedCampaign> getAcceptedCampaignsByEmail(String email) {
        return acceptedCampaignRepository.findAll().stream()
                .filter(campaign -> campaign.getEmail().equals(email))
                .collect(Collectors.toList());
    }

    public List<Campaign> getPendingCampaignsByEmail(String email) {
        return campaignRepository.findAll().stream()
                .filter(campaign -> campaign.getEmail().equals(email))
                .collect(Collectors.toList());
    }

    public void approveCampaign(String campaignId) {
        Optional<Campaign> optionalCampaign = campaignRepository.findByCampId(campaignId);
        if (optionalCampaign.isPresent()) {
            Campaign campaign = optionalCampaign.get();
            campaign.setStatus("accepted");

            // Create an AcceptedCampaign instance using the default constructor
            AcceptedCampaign acceptedCampaign = new AcceptedCampaign();
            acceptedCampaign.setCampId(campaign.getCampId());
            acceptedCampaign.setName(campaign.getName());
            acceptedCampaign.setDescription(campaign.getDescription());
            acceptedCampaign.setRaisedAmount(0);
            acceptedCampaign.setBeneficiaryAddress(campaign.getBeneficiaryAddress());
            acceptedCampaign.setGoalAmount(campaign.getGoalAmount());
            acceptedCampaign.setEmail(campaign.getEmail());
            acceptedCampaign.setImage(campaign.getImage());
            acceptedCampaign.setStatus("accepted");
            acceptedCampaignRepository.save(acceptedCampaign); // Save to "accepted" collection
            campaignRepository.deleteByCampId(campaignId); // Delete from "pending" collection
        } else {
            throw new RuntimeException("Campaign not found");
        }
    }

    public List<Campaign> getCampaignsByEmail(String email) {
        // Implement logic to fetch all campaigns (accepted, rejected, and pending) for the given email
        // Example:
        List<Campaign> campaigns = campaignRepository.findByEmail(email);

        // Fetch pending and rejected campaign

        campaigns.addAll(acceptedCampaignRepository.findByEmail(email));

        campaigns.addAll(rejectedCampaignRepository.findByEmail(email));

        // Fetch accepted campaigns and add them to the list


        return campaigns;
    }

    public void rejectCampaign(String campaignId) {
        Optional<Campaign> optionalCampaign = campaignRepository.findById(campaignId);
        if (optionalCampaign.isPresent()) {
            Campaign campaign = optionalCampaign.get();
            campaign.setStatus("rejected");

            // Create an AcceptedCampaign instance using the default constructor
            RejectedCampaign rejectedCampaign = new RejectedCampaign();
            rejectedCampaign.setName(campaign.getName());
            rejectedCampaign.setDescription(campaign.getDescription());
            rejectedCampaign.setBeneficiaryAddress(campaign.getBeneficiaryAddress());
            rejectedCampaign.setGoalAmount(campaign.getGoalAmount());
            rejectedCampaign.setEmail(campaign.getEmail());
            rejectedCampaignRepository.save(rejectedCampaign);
            campaignRepository.deleteById(campaignId);
        } else {
            throw new RuntimeException("Campaign not found");
        }
    }

    public List<Campaign> getAllProjects() {
        return campaignRepository.findAll();
    }

    public void updateRaisedAmount(String email, double amount , String name , String campId) {
        AcceptedCampaign campaigns = acceptedCampaignRepository.findByCampId(campId);
        AcceptedCampaign campaign = null;

        if (campaigns!=null) {
            campaign = campaigns;
        }
        if (campaign != null) {
            double newRaisedAmount = campaign.getRaisedAmount() + amount;
            System.out.println(newRaisedAmount);
            campaign.setRaisedAmount(newRaisedAmount);
            String beneficiary= campaign.getName();
            Donor donor = new Donor(email, name, beneficiary,campId);

            // Save the Donor object to the database
            donorrepository.save(donor);
            acceptedCampaignRepository.save(campaign);
        }
    }
    public AcceptedCampaign getProjectDetails(String projectId) {
        // Implement logic to retrieve project details from your data source (e.g., database)
        // Replace the following code with your actual implementation
        List<AcceptedCampaign> acceptedCampaigns = getAllAcceptedCampaigns();
        return acceptedCampaigns.stream()
                .filter(campaign -> campaign.getId().equals(projectId))
                .findFirst()
                .orElse(null);
    }

}