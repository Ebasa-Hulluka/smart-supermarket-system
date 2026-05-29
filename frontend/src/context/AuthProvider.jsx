import { useState } from 'react'
import { AuthContext } from './AuthContextValue'

const LOGIN_PASSWORD = '123456'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = window.localStorage.getItem('gebeyaUser')
    return saved ? JSON.parse(saved) : null
  })

  const login = (email, password) => {
    if (email === 'ebasahuluka@gmail.com' && password === LOGIN_PASSWORD) {
      const authUser = { name: 'Admin', email }
      setUser(authUser)
      window.localStorage.setItem('gebeyaUser', JSON.stringify(authUser))
      return true
    }
    throw new Error('Incorrect emil or password')
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
