package com.charity.charity;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;

public interface AcceptedCampaignRepository extends MongoRepository<AcceptedCampaign, String> {
    // Additional custom methods if needed
    Collection<? extends Campaign> findByEmail(String email);

    AcceptedCampaign findByCampId(String campId);
}