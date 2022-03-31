import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import useAuth from '../../auth/useAuth'
import { Loader } from '../Loader'

export default function AuthContent({ children }: { children: ReactNode }) {
  const { loggedIn, loading } = useAuth()
  const router = useRouter()
  // Navigate unauthenticated users to login page.
  useEffect(() => {
    if (!loading && !loggedIn) {
      router.push('/login')
    }
  }, [loggedIn, loading, router])

  if (loggedIn) {
    return <>{children}</>
  }

  return <Loader size={10} color="var(--bs-primary)" />
}
