import { useState } from 'react'
import { AuthContext } from './AuthContextValue'

const LOGIN_PASSWORD = 'password123'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = window.localStorage.getItem('gebeyaUser')
    return saved ? JSON.parse(saved) : null
  })

  const login = (password) => {
    if (password === LOGIN_PASSWORD) {
      const authUser = { name: 'Admin' }
      setUser(authUser)
      window.localStorage.setItem('gebeyaUser', JSON.stringify(authUser))
      return true
    }
    throw new Error('Incorrect password')
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('gebeyaUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
