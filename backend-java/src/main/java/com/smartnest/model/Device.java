package com.smartnest.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

/**
 * Device Model - Represents a smart home IoT device
 * 
 * Extend this model to add more fields like:
 * - powerConsumption
 * - automation rules
 * - device firmware version
 * - last seen timestamp
 */
@Document(collection = "devices")
public class Device {
    
    @Id
    private String id;
    
    @NotBlank(message = "Device name is required")
    private String name;
    
    @NotBlank(message = "Device type is required")
    private String type; // light, fan, lock, thermostat, etc.
    
    @NotBlank(message = "Device status is required")
    private String status; // ON, OFF
    
    @NotBlank(message = "Location is required")
    private String location;
    
    private LocalDateTime lastUpdated;
    
    // Additional fields for future extension
    private Double temperature; // for thermostats
    private Integer brightness; // for lights (0-100)
    private Integer speed; // for fans (0-5)
    
    // Constructors
    public Device() {
        this.lastUpdated = LocalDateTime.now();
    }
    
    public Device(String name, String type, String status, String location) {
        this.name = name;
        this.type = type;
        this.status = status;
        this.location = location;
        this.lastUpdated = LocalDateTime.now();
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
        this.lastUpdated = LocalDateTime.now();
    }
    
    public String getLocation() {
        return location;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }
    
    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
    
    public Double getTemperature() {
        return temperature;
    }
    
    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }
    
    public Integer getBrightness() {
        return brightness;
    }
    
    public void setBrightness(Integer brightness) {
        this.brightness = brightness;
    }
    
    public Integer getSpeed() {
        return speed;
    }
    
    public void setSpeed(Integer speed) {
        this.speed = speed;
    }
}

