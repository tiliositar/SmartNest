package com.smartnest.controller;

import com.smartnest.model.Device;
import com.smartnest.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * Device Controller - REST API endpoints for device management
 * 
 * Endpoints:
 * - GET /api/devices - List all devices
 * - GET /api/devices/{id} - Get device by ID
 * - POST /api/devices - Create new device
 * - PUT /api/devices/{id} - Update device
 * - DELETE /api/devices/{id} - Delete device
 * - POST /api/devices/{id}/toggle - Toggle device ON/OFF
 */
@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "*")
public class DeviceController {
    
    @Autowired
    private DeviceRepository deviceRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    // GET /api/devices - List all devices
    @GetMapping
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> devices = deviceRepository.findAll();
        return ResponseEntity.ok(devices);
    }
    
    // GET /api/devices/{id} - Get device by ID
    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable String id) {
        Optional<Device> device = deviceRepository.findById(id);
        return device.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    // POST /api/devices - Create new device
    @PostMapping
    public ResponseEntity<Device> createDevice(@Valid @RequestBody Device device) {
        Device savedDevice = deviceRepository.save(device);
        
        // Send WebSocket notification
        messagingTemplate.convertAndSend("/topic/devices", savedDevice);
        
        return ResponseEntity.ok(savedDevice);
    }
    
    // PUT /api/devices/{id} - Update device
    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable String id, 
                                               @Valid @RequestBody Device deviceDetails) {
        Optional<Device> deviceOpt = deviceRepository.findById(id);
        
        if (deviceOpt.isPresent()) {
            Device device = deviceOpt.get();
            device.setName(deviceDetails.getName());
            device.setType(deviceDetails.getType());
            device.setStatus(deviceDetails.getStatus());
            device.setLocation(deviceDetails.getLocation());
            device.setTemperature(deviceDetails.getTemperature());
            device.setBrightness(deviceDetails.getBrightness());
            device.setSpeed(deviceDetails.getSpeed());
            
            Device updatedDevice = deviceRepository.save(device);
            
            // Send WebSocket notification
            messagingTemplate.convertAndSend("/topic/devices", updatedDevice);
            
            return ResponseEntity.ok(updatedDevice);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // DELETE /api/devices/{id} - Delete device
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable String id) {
        if (deviceRepository.existsById(id)) {
            deviceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // POST /api/devices/{id}/toggle - Toggle device ON/OFF
    @PostMapping("/{id}/toggle")
    public ResponseEntity<Device> toggleDevice(@PathVariable String id) {
        Optional<Device> deviceOpt = deviceRepository.findById(id);
        
        if (deviceOpt.isPresent()) {
            Device device = deviceOpt.get();
            String currentStatus = device.getStatus();
            device.setStatus(currentStatus.equals("ON") ? "OFF" : "ON");
            
            Device updatedDevice = deviceRepository.save(device);
            
            // Send WebSocket notification envelope
            messagingTemplate.convertAndSend("/topic/devices", updatedDevice);
            
            return ResponseEntity.ok(updatedDevice);
        }
        
        return ResponseEntity.notFound().build();
    }
}

