import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextValue'

export function useAuth() {
  return useContext(AuthContext)
}
