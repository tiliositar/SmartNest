function DeviceCard({ device, onToggle }) {
  const statusColors = {
    ON: 'bg-green-100 text-green-800',
    OFF: 'bg-gray-100 text-gray-800',
    LOCKED: 'bg-blue-100 text-blue-800',
    UNLOCKED: 'bg-yellow-100 text-yellow-800'
  }

  const icons = {
    light: '💡',
    fan: '🌀',
    lock: '🔒',
    thermostat: '🌡️'
  }

  const isOn = device.status === 'ON' || device.status === 'UNLOCKED'

  return (
    <div className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 border-l-4 ${isOn ? 'border-green-500' : 'border-gray-300'}`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl">{icons[device.type] || '⚙️'}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{device.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{device.type}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Location</p>
          <p className="font-medium text-gray-800">{device.location}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[device.status] || 'bg-gray-100 text-gray-800'}`}>
              {device.status}
            </span>
          </div>
          {device.temperature && (
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Temperature</p>
              <p className="text-2xl font-bold text-blue-600">{device.temperature}°F</p>
            </div>
          )}
        </div>

        <button
          onClick={() => onToggle(device.id)}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-200 ${
            isOn
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          {isOn ? 'Turn Off' : 'Turn On'}
        </button>

        {device.lastUpdated && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Updated: {new Date(device.lastUpdated).toLocaleTimeString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default DeviceCard

