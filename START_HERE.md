# 🚀 How to Run SmartNest

## Prerequisites
1. ✅ Docker Desktop installed and running
2. ✅ This project folder on your computer

## Running the Project

### Step 1: Open Terminal/Command Prompt
Navigate to the project directory:
```bash
cd "C:\Users\HP\Desktop\OOP Java Project"
```

### Step 2: Build and Start All Services
Run this command to build Docker images and start all services:
```bash
docker compose up --build
```

**First time running?** This will:
- Download MongoDB image
- Build Java backend (downloads dependencies)
- Build Node.js gateway (downloads dependencies)  
- Build React frontend (downloads dependencies)
- **This may take 5-10 minutes**

### Step 3: Wait for Services to Start
You'll see logs from all services. Wait until you see:
```
🚀 SmartNest Backend is running on http://localhost:8080
🚀 SmartNest Gateway is running on http://localhost:4000
```

### Step 4: Access the Application
Open your web browser and go to:
**http://localhost:5173**

### Step 5: Login
- **Username:** `admin`
- **Password:** `admin123`

You should now see the SmartNest dashboard with sample devices!

---

## 📋 What's Running?

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | React Dashboard |
| **Backend API** | http://localhost:8080 | Spring Boot API |
| **Gateway** | http://localhost:4000/status | IoT Gateway |
| **MongoDB** | localhost:27017 | Database |

---

## 🛠️ Useful Commands

### Stop All Services
Press `Ctrl + C` in the terminal, then:
```bash
docker compose down
```

### Stop and Remove Volumes (Fresh Start)
```bash
docker compose down -v
```

### View Running Containers
```bash
docker ps
```

### View Logs
```bash
# All services
docker compose logs

# Specific service
docker compose logs backend-java
docker compose logs frontend-react
docker compose logs gateway-node
docker compose logs mongo
```

### Rebuild Specific Service
```bash
docker compose up --build backend-java
```

---

## ❌ Troubleshooting

### Port Already in Use
If port 8080, 5173, 4000, or 27017 is already in use:
1. Stop the conflicting application
2. Or change ports in `docker-compose.yml`

### Backend Won't Start
Check if MongoDB is running:
```bash
docker compose logs mongo
```

### Frontend Shows Connection Error
1. Wait for backend to fully start (about 1-2 minutes)
2. Check backend logs: `docker compose logs backend-java`
3. Try refreshing the browser

### Clean Rebuild
If something goes wrong, start fresh:
```bash
docker compose down -v
docker compose up --build
```

---

## 🎯 Next Steps

1. ✅ **Explore the dashboard** - Toggle devices on/off
2. ✅ **Check WebSocket** - Status updates should appear in real-time
3. ✅ **View Gateway** - Visit http://localhost:4000/status
4. ✅ **Check API** - Visit http://localhost:8080/api/devices (after login)
5. 🔧 **Customize** - Add your own devices or features!

---

## 📝 Development Mode

To develop with hot-reload (without Docker):

### Backend
```bash
cd backend-java
./mvnw spring-boot:run
```

### Gateway
```bash
cd gateway-node
npm install
npm start
```

### Frontend
```bash
cd frontend-react
npm install
npm run dev
```

---

Happy coding! 🏠✨


