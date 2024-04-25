import { createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
import api from '../services/api'

interface AuthProviderProps {
  children: React.ReactNode
}

interface SignInProps {
  email: string
  password: string
}

interface SignUpProps {
  email: string
  password: string
  phone: string
  name: string
}

interface AuthContextType {
  token?: string
  signIn: (props: SignInProps) => Promise<void>
  signUp: (props: SignUpProps) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage('token', null)
  const navigate = useNavigate()

  const signIn = async ({ email, password }: SignInProps) => {
    const response = await api.post('/signin', {
      email,
      password,
    })
    setToken(response.data.session.access_token)
    navigate('/')
  }

  const signUp = async ({ email, password, phone, name }: SignUpProps) => {
    const response = await api.post('/signup', {
      email,
      password,
      phone,
      name,
    })
    setToken(response.data.session.access_token)
    navigate('/')
  }

  const signOut = () => {
    setToken(null)
    navigate('/sign-in')
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
