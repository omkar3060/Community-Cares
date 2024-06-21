package com.charity.charity;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Donorrepository extends MongoRepository<Donor, String> {
}
