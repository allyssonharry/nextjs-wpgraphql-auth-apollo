import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Loader } from '../Loader'
import useAuth from '../../auth/useAuth'

export default function UnAuthContent({ children }: { children: ReactNode }) {
  const { loggedIn, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && loggedIn) {
      router.push('/')
    }
  }, [loggedIn, loading, router])

  if (!loggedIn) {
    return <>{children}</>
  }

  return <Loader size={10} color="var(--bs-primary)" />
}
