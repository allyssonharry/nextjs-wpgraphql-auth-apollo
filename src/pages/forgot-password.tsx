import Link from 'next/link'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { PasswordReset } from '../components/PasswordReset'
import { UnAuthContent } from '../components/UnAuthContent'

export default function ForgotPassword() {
  return (
    <Container>
      <UnAuthContent>
        <ResetPasswordWrapper>
          <h3 className="fw-bold">Forgot your password?</h3>
          <p>
            Enter your email address and we'll send you a link to set your
            password.
          </p>
          <PasswordReset />
          <Link href="/login">
            <a className="d-block mt-4 text-center">Back to login</a>
          </Link>
        </ResetPasswordWrapper>
      </UnAuthContent>
    </Container>
  )
}

const ResetPasswordWrapper = styled.div.attrs(() => ({
  className: 'mt-5 mx-auto mb-0',
}))``
