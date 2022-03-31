import styled from 'styled-components'
import Link from 'next/link'
import Layout from '../components/Layout/Layout'
import { AuthContent } from '../components/AuthContent'
import useAuth from '../auth/useAuth'

export default function Frontpage() {
  const { user } = useAuth()

  return (
    <Layout>
      <AuthContent>
        <Heading>Hello, {user?.firstName}</Heading>
        <span>
          <Link href="/logout">
            <a>Logout</a>
          </Link>
        </span>
      </AuthContent>
    </Layout>
  )
}

const Heading = styled.h1.attrs(() => ({
  className: 'font-weight-light',
}))``
