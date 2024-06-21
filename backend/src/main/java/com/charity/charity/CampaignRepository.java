package com.charity.charity;

import com.charity.charity.Campaign;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CampaignRepository extends MongoRepository<Campaign, String> {
    Optional<Campaign> findByCampId(String campaignId);

    void deleteByCampId(String campaignId);

    List<Campaign> findByEmail(String email);
}
