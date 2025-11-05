import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('token')
    const storedUsername = localStorage.getItem('username')
    
    if (storedToken && storedUsername) {
      setToken(storedToken)
      setUsername(storedUsername)
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (authToken, username) => {
    setToken(authToken)
    setUsername(username)
    setIsAuthenticated(true)
    localStorage.setItem('token', authToken)
    localStorage.setItem('username', username)
  }

  const handleLogout = () => {
    setToken(null)
    setUsername(null)
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard token={token} username={username} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App

