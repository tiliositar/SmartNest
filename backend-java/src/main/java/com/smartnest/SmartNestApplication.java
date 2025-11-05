package com.smartnest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SmartNest Application - Smart Home Control & Automation Backend
 * 
 * This is the main entry point for the SmartNest backend service.
 * It provides REST APIs for device management, authentication, and real-time updates via WebSocket.
 */
@SpringBootApplication
public class SmartNestApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartNestApplication.class, args);
        System.out.println("🚀 SmartNest Backend is running on http://localhost:8080");
    }
}

