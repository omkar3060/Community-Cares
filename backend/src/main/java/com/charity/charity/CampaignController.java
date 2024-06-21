package com.charity.charity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @Autowired
    private TotalRaisedAmountRepository totalRaisedAmountRepository;

    @PostMapping("/pending-campaigns")
    public ResponseEntity<?> createCampaign(@RequestParam("name") String name,
                                            @RequestParam("description") String description,
                                            @RequestParam("beneficiaryAddress") String beneficiaryAddress,
                                            @RequestParam("goalAmount") double goalAmount,
                                            @RequestParam("email") String email,
                                            @RequestParam("image") MultipartFile image) {
        try {
            Campaign campaign = new Campaign();
            campaign.setName(name);
            campaign.setDescription(description);
            campaign.setBeneficiaryAddress(beneficiaryAddress);
            campaign.setGoalAmount(goalAmount);
            campaign.setEmail(email);
            campaign.setImage(image.getBytes()); // Convert MultipartFile to byte[]

            Campaign createdCampaign = campaignService.createCampaign(campaign);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCampaign);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating campaign: " + e.getMessage());
        }
    }

    @GetMapping("/projects/{email}")
    public List<AcceptedCampaign> getAcceptedCampaignsByEmail(@PathVariable String email) {
        return campaignService.getAcceptedCampaignsByEmail(email);
    }

    @GetMapping("/pending-projects/{email}")
    public List<Campaign> getPendingCampaignsByEmail(@PathVariable String email) {
        return campaignService.getPendingCampaignsByEmail(email);
    }

    @GetMapping("/projects")
    public List<AcceptedCampaign> getAllAcceptedCampaigns() {
        return campaignService.getAllAcceptedCampaigns();
    }

    @GetMapping("/count/projects")
    public long getNumberOfAcceptedCampaigns() {
        return campaignService.getNumberOfAcceptedCampaigns();
    }

    @GetMapping("/pending-projects")
    public List<Campaign> getAllProjects() {
        return campaignService.getAllProjects();
    }

    @PutMapping("/admin/approve/{campaignId}")
    public ResponseEntity<?> approveCampaign(@PathVariable String campaignId) {
        try {
            campaignService.approveCampaign(campaignId);
            return ResponseEntity.ok("Campaign approved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error approving campaign: " + e.getMessage());
        }
    }

    @PutMapping("/admin/reject/{campaignId}")
    public ResponseEntity<?> rejectCampaign(@PathVariable String campaignId) {
        try {
            campaignService.rejectCampaign(campaignId);
            return ResponseEntity.ok("Campaign rejected successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error rejecting campaign: " + e.getMessage());
        }
    }

    @PutMapping("/admin/remove/{campaignId}")
    public ResponseEntity<?> removeCampaign(@PathVariable String campaignId) {
        try {
            campaignService.rejectCampaign(campaignId);
            return ResponseEntity.ok("Campaign removed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing campaign: " + e.getMessage());
        }
    }

    @PostMapping("/donated")
    public ResponseEntity<?> donateToCampaign(@RequestParam String email, @RequestParam String campId,@RequestBody Map<String, Object> data) {
        try {
            double amount = Double.parseDouble(data.get("amount").toString());
            campaignService.updateRaisedAmount(email, amount , data.get("name").toString(),campId);

            TotalRaisedAmount totalRaisedAmount = totalRaisedAmountRepository.findAll().stream().findFirst().orElse(new TotalRaisedAmount(0));
            totalRaisedAmount.setTotalAmount(amount+totalRaisedAmount.getTotalAmount());
            totalRaisedAmountRepository.save(totalRaisedAmount);

            return ResponseEntity.ok("Donation successfully added to the campaign");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error donating to campaign: " + e.getMessage());
        }
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<AcceptedCampaign> getProjectDetails(@PathVariable String projectId) {
        try {
            AcceptedCampaign project = campaignService.getProjectDetails(projectId);
            if (project != null) {
                return ResponseEntity.ok(project);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
