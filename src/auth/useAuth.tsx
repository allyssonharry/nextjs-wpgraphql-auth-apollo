import { useQuery, ApolloError } from '@apollo/client'
import React, { createContext, useContext, ReactNode } from 'react'
import { GET_VIEWER } from '../graphql/queries'

export interface User {
  id: string
  databaseId: number
  firstName: string
  lastName: string
  email: string
  description: string
  url: string
  capabilities: string[]
}

interface AuthData {
  loggedIn: boolean
  user?: User
  loading: boolean
  error?: ApolloError
}

const DEFAULT_STATE: AuthData = {
  loggedIn: false,
  user: undefined,
  loading: false,
  error: undefined,
}

const AuthContext = createContext(DEFAULT_STATE)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useQuery(GET_VIEWER)
  const user = data?.viewer
  const loggedIn = Boolean(user)

  const value = {
    loggedIn,
    user,
    loading,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export default useAuth
