/**
 * SmartNest IoT Gateway Service
 * 
 * This gateway service handles:
 * - IoT device communication (MQTT placeholder)
 * - Automation scheduling (node-cron)
 * - WebSocket server for real-time updates
 * - Status endpoint for health checks
 */

const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Simulated IoT devices database
const simulatedDevices = [
  { id: '1', name: 'Living Room Light', type: 'light', status: 'OFF', location: 'Living Room' },
  { id: '2', name: 'Master Bedroom Fan', type: 'fan', status: 'ON', location: 'Master Bedroom' },
  { id: '3', name: 'Front Door Lock', type: 'lock', status: 'LOCKED', location: 'Front Door' },
  { id: '4', name: 'Thermostat', type: 'thermostat', status: 'ON', location: 'Hallway', temperature: 72 }
];

// Health check endpoint
app.get('/status', (req, res) => {
  res.json({ 
    status: 'Gateway Running',
    timestamp: new Date().toISOString(),
    services: {
      gateway: 'online',
      mqtt: 'placeholder', // MQTT integration pending
      automation: 'active'
    }
  });
});

// Get simulated devices
app.get('/devices', (req, res) => {
  res.json(simulatedDevices);
});

// WebSocket Server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  
  ws.on('message', (message) => {
    console.log('Received message:', message.toString());
    // Echo message back to client
    ws.send(JSON.stringify({ 
      type: 'echo', 
      data: message.toString(),
      timestamp: new Date().toISOString()
    }));
  });
  
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connected',
    message: 'Connected to SmartNest Gateway',
    timestamp: new Date().toISOString()
  }));
});

// MQTT Placeholder - Future integration
function initMQTTConnection() {
  console.log('📡 MQTT placeholder initialized');
  console.log('   → Future: Connect to real MQTT broker for IoT device communication');
  console.log('   → Example: mqtt://iot-broker.example.com:1883');
  
  // Simulate MQTT message reception
  setInterval(() => {
    // This would receive real MQTT messages from devices
    console.log('🔔 [MQTT] Simulated message from device');
  }, 30000); // Every 30 seconds
}

// Automation Scheduler with node-cron
function startAutomationScheduler() {
  // Run every minute
  cron.schedule('* * * * *', () => {
    console.log('⏰ Running automation scheduler...');
    
    // Example automation logic
    // Check if it's night time and turn off lights
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) {
      console.log('   🌙 Night mode: Turning off non-essential lights');
    }
    
    // Send update via WebSocket
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'automation',
          message: 'Automation scheduler executed',
          timestamp: new Date().toISOString()
        }));
      }
    });
  });
  
  console.log('✅ Automation scheduler started (runs every minute)');
}

// Initialize services
initMQTTConnection();
startAutomationScheduler();

// Start server
server.listen(PORT, () => {
  console.log(`🚀 SmartNest Gateway is running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket server is running on ws://localhost:${PORT}/ws`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

