// MongoDB initialization script
// This script runs automatically when the MongoDB container is first created

db = db.getSiblingDB('smartnest');

// Insert sample devices
db.devices.insertMany([
  {
    name: 'Living Room Light',
    type: 'light',
    status: 'OFF',
    location: 'Living Room',
    brightness: 50,
    lastUpdated: new Date()
  },
  {
    name: 'Master Bedroom Fan',
    type: 'fan',
    status: 'ON',
    location: 'Master Bedroom',
    speed: 3,
    lastUpdated: new Date()
  },
  {
    name: 'Front Door Lock',
    type: 'lock',
    status: 'LOCKED',
    location: 'Front Door',
    lastUpdated: new Date()
  },
  {
    name: 'Thermostat',
    type: 'thermostat',
    status: 'ON',
    location: 'Hallway',
    temperature: 72,
    lastUpdated: new Date()
  }
]);

print('✅ SmartNest database initialized with sample devices');

