package com.smartnest.repository;

import com.smartnest.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * User Repository - MongoDB Data Access Layer for Users
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
}

