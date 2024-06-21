package com.charity.charity;

import com.charity.charity.login;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface studentrepository extends MongoRepository<login,String> {

    boolean existsByEmail(String email);
    login findByEmail(String email);


}
