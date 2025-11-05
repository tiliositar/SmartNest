# 🏠 SmartNest - Smart Home Control & Automation System

**SmartNest** is a full-stack smart home platform that allows users to view, control, and automate IoT devices. The system consists of a Java Spring Boot backend API, a Node.js gateway service for IoT communication, and a React frontend dashboard.

![SmartNest Architecture](https://img.shields.io/badge/Architecture-Microservices-blue)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![React](https://img.shields.io/badge/React-18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [API Endpoints](#-api-endpoints)
- [Development](#-development)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)

## ✨ Features

- **Device Management**: Full CRUD operations for IoT devices
- **Real-time Updates**: WebSocket-based live device status updates
- **User Authentication**: JWT-based secure authentication
- **Dashboard UI**: Modern, responsive React dashboard with Tailwind CSS
- **IoT Gateway**: Node.js service for device communication and automation
- **Automation Scheduler**: Cron-based automation rules (placeholder)
- **Docker Support**: Complete containerization with Docker Compose

## 🛠️ Technology Stack

### Backend
- **Java 17** with **Spring Boot 3.2**
- **Spring Data MongoDB** for database operations
- **Spring Security** for authentication and authorization
- **WebSocket/STOMP** for real-time communication
- **JWT** for token-based authentication

### Gateway
- **Node.js 18** with **Express.js**
- **WebSocket (ws)** for real-time communication
- **node-cron** for automation scheduling
- **MQTT** placeholder for future IoT integration

### Frontend
- **React 18** with **Vite**
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **SockJS + STOMP** for WebSocket communication

### Database
- **MongoDB 7.0** for data persistence

### DevOps
- **Docker** for containerization
- **Docker Compose** for orchestration
- **Nginx** for serving React app

## 📁 Project Structure

```
SmartNest/
│
├── backend-java/              # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/smartnest/
│   │       │   ├── model/           # Device, User models
│   │       │   ├── repository/      # MongoDB repositories
│   │       │   ├── controller/      # REST controllers
│   │       │   ├── service/         # Business logic
│   │       │   └── config/          # Security, WebSocket configs
│   │       └── resources/
│   │           └── application.yml  # Application configuration
│   ├── pom.xml
│   └── Dockerfile
│
├── gateway-node/              # Node.js IoT Gateway
│   ├── server.js             # Main gateway server
│   ├── package.json
│   └── Dockerfile
│
├── frontend-react/            # React Frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API & WebSocket services
│   │   └── App.jsx
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml         # Container orchestration
├── mongo-init.js             # MongoDB initialization
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Docker** and **Docker Compose** installed
- **Git** for cloning the repository

### Installation & Running

1. **Clone the repository** (or ensure all files are in the SmartNest directory)

2. **Start all services with Docker Compose**:
   ```bash
   docker compose up --build
   ```

3. **Access the application**:
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:8080
   - **Gateway**: http://localhost:4000/status
   - **MongoDB**: localhost:27017

4. **Login Credentials**:
   - Username: `admin`
   - Password: `admin123`

### Building Individual Services

#### Backend (Spring Boot)
```bash
cd backend-java
mvn clean install
mvn spring-boot:run
```

#### Gateway (Node.js)
```bash
cd gateway-node
npm install
npm start
```

#### Frontend (React)
```bash
cd frontend-react
npm install
npm run dev
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Devices
- `GET /api/devices` - Get all devices
- `GET /api/devices/{id}` - Get device by ID
- `POST /api/devices` - Create new device
- `PUT /api/devices/{id}` - Update device
- `DELETE /api/devices/{id}` - Delete device
- `POST /api/devices/{id}/toggle` - Toggle device ON/OFF

### WebSocket
- `ws://localhost:8080/ws` - WebSocket endpoint
- `/topic/devices` - Device update topic

### Gateway
- `GET /status` - Gateway health check

## 💻 Development

### Adding New Devices

1. Add device data to MongoDB:
   ```javascript
   db.devices.insert({
     name: "Kitchen Light",
     type: "light",
     status: "OFF",
     location: "Kitchen"
   });
   ```

2. The device will automatically appear in the dashboard

### Extending Device Functionality

The `Device` model in `backend-java` can be extended with additional fields:
- `powerConsumption` - Track energy usage
- `firmwareVersion` - Manage device firmware
- `lastSeen` - Device connectivity status
- Custom fields based on device type

### Implementing Real MQTT

Replace the placeholder in `gateway-node/server.js`:
```javascript
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://your-broker:1883');

client.on('connect', () => {
  client.subscribe('devices/+/status');
});

client.on('message', (topic, message) => {
  // Handle MQTT message
});
```

## 🚢 Deployment

### Production Considerations

1. **Change JWT Secret**: Update `jwt.secret` in `application.yml`
2. **Use Environment Variables**: Replace hardcoded values
3. **Enable HTTPS**: Configure SSL/TLS certificates
4. **Database Backup**: Set up MongoDB backup strategy
5. **Resource Limits**: Add Docker resource constraints
6. **Monitoring**: Integrate logging and monitoring tools

### Docker Compose for Production

Create a separate `docker-compose.prod.yml`:
```yaml
services:
  mongo:
    image: mongo:7.0
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
```

## 🔮 Future Enhancements

- [ ] Real MQTT integration with IoT devices
- [ ] Advanced automation rules engine
- [ ] Voice control (Alexa/Google Home)
- [ ] Mobile app (React Native)
- [ ] Machine learning for energy optimization
- [ ] Multi-user support with roles and permissions
- [ ] Device grouping and scenes
- [ ] Historical data and analytics
- [ ] Push notifications
- [ ] OAuth2 integration

## 📝 License

This project is open source and available for educational purposes.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using Spring Boot, React, Node.js, and MongoDB**


