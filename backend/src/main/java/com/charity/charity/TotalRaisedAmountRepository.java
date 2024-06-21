package com.charity.charity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TotalRaisedAmountRepository extends MongoRepository<TotalRaisedAmount, String> {
    // You can add custom query methods here if needed
}

