import styled from 'styled-components'
import { Layout } from '../components/Layout'
import { SignUpForm } from '../components/SignUpForm'
import { UnAuthContent } from '../components/UnAuthContent'

export default function SignUp() {
  return (
    <Layout>
      <UnAuthContent>
        <SignUpWrapper>
          <SignUpForm />
        </SignUpWrapper>
      </UnAuthContent>
    </Layout>
  )
}

const SignUpWrapper = styled.div.attrs(() => ({
  className: 'mt-5 mx-auto mb-0',
}))``
