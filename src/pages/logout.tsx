import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Loader } from '../components/Loader'
import { LOG_OUT } from '../graphql/mutations'
import { GET_VIEWER } from '../graphql/queries'

export default function Logout() {
  const router = useRouter()
  const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [{ query: GET_VIEWER }],
  })
  const loggedOut = Boolean(data?.logout?.status)

  useEffect(() => {
    logOut()
  }, [logOut])

  if (loggedOut) {
    router.push('/login')
  }

  return (
    <Layout>
      <div>
        {!called || loading ? (
          <Loader size={10} color="var(--bs-primary)" />
        ) : error ? (
          <div>{error?.message}</div>
        ) : !loggedOut ? (
          'An error ocurred. Please, refresh page'
        ) : (
          'You are logged out.'
        )}
      </div>
    </Layout>
  )
}
