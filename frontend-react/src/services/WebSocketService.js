import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

/**
 * WebSocket Service for real-time device updates
 * 
 * This service connects to the Spring Boot WebSocket endpoint
 * and subscribes to device update messages.
 */
class WebSocketService {
  constructor() {
    this.stompClient = null
    this.socket = null
    this.onUpdateCallback = null
    this.onStatusChangeCallback = null
  }

  connect(onStatusChange, onUpdate) {
    this.onStatusChangeCallback = onStatusChange
    this.onUpdateCallback = onUpdate

    const socketUrl = 'http://localhost:8080/ws'
    this.socket = new SockJS(socketUrl)
    this.stompClient = Stomp.over(this.socket)

    this.stompClient.connect(
      {},
      (frame) => {
        console.log('Connected to WebSocket:', frame)
        this.onStatusChangeCallback('Connected')

        // Subscribe to device updates topic
        this.stompClient.subscribe('/topic/devices', (message) => {
          try {
            const deviceUpdate = JSON.parse(message.body)
            console.log('Received device update:', deviceUpdate)
            
            if (this.onUpdateCallback) {
              this.onUpdateCallback(deviceUpdate)
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error)
          }
        })
      },
      (error) => {
        console.error('WebSocket connection error:', error)
        this.onStatusChangeCallback('Disconnected')
        
        // Attempt to reconnect after 5 seconds
        setTimeout(() => {
          if (!this.isConnected()) {
            this.connect(this.onStatusChangeCallback, this.onUpdateCallback)
          }
        }, 5000)
      }
    )
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected from WebSocket')
        this.onStatusChangeCallback('Disconnected')
      })
    }
  }

  isConnected() {
    return this.stompClient && this.stompClient.connected
  }

  sendMessage(message) {
    if (this.isConnected()) {
      this.stompClient.send('/app/devices', {}, JSON.stringify(message))
    } else {
      console.warn('WebSocket is not connected. Cannot send message.')
    }
  }
}

export default WebSocketService

