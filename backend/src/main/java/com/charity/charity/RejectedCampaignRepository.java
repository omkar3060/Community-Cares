package com.charity.charity;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;

public interface RejectedCampaignRepository extends MongoRepository<RejectedCampaign, String> {
    Collection<? extends Campaign> findByEmail(String email);
}
