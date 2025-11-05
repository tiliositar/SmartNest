package com.smartnest.repository;

import com.smartnest.model.Device;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Device Repository - MongoDB Data Access Layer for Devices
 * 
 * Spring Data MongoDB automatically provides CRUD operations.
 * Add custom queries here as needed.
 */
@Repository
public interface DeviceRepository extends MongoRepository<Device, String> {
    
    // Find devices by type
    List<Device> findByType(String type);
    
    // Find devices by location
    List<Device> findByLocation(String location);
    
    // Find devices by status
    List<Device> findByStatus(String status);
    
    // Find devices by location and type
    List<Device> findByLocationAndType(String location, String type);
}

