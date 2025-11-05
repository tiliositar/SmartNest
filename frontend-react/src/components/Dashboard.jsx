import { useState, useEffect } from 'react'
import axios from 'axios'
import DeviceCard from './DeviceCard'

function Dashboard({ token, username, onLogout }) {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [wsStatus, setWsStatus] = useState('Disconnected')

  // Initialize WebSocket connection
  useEffect(() => {
    let wsService = null
    let isMounted = true

    import('../services/WebSocketService')
      .then(({ default: WebSocketService }) => {
        if (!isMounted) return
        wsService = new WebSocketService()
        try {
          wsService.connect(setWsStatus, (update) => {
            setDevices(prevDevices =>
              prevDevices.map(device =>
                device.id === update.id ? { ...device, ...update } : device
              )
            )
          })
        } catch (e) {
          console.error('WebSocket init error:', e)
          setWsStatus('Disconnected')
        }
      })
      .catch((e) => {
        console.error('Failed to load WebSocketService:', e)
        setWsStatus('Disconnected')
      })

    return () => {
      isMounted = false
      if (wsService && typeof wsService.disconnect === 'function') {
        wsService.disconnect()
      }
    }
  }, [])

  // Fetch devices from backend
  useEffect(() => {
    fetchDevices()
  }, [token])

  const fetchDevices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/devices', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setDevices(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch devices. ' + (err.response?.data?.error || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleToggleDevice = async (deviceId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/devices/${deviceId}/toggle`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      
      // Update the device in the local state
      setDevices(prevDevices =>
        prevDevices.map(device =>
          device.id === deviceId ? response.data : device
        )
      )
    } catch (err) {
      setError('Failed to toggle device: ' + err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary-600">🏠 SmartNest Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {username}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${wsStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">{wsStatus}</span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading devices...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Devices</h2>
              <p className="text-sm text-gray-600">{devices.length} device(s) online</p>
            </div>

            {devices.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-600">No devices found. Add devices to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {devices.map((device) => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    onToggle={handleToggleDevice}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default Dashboard

