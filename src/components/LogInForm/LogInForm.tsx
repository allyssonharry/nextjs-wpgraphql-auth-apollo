import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useState } from 'react'
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { LOG_IN } from '../../graphql/mutations'
import { GET_VIEWER } from '../../graphql/queries'
import { Loader } from '../Loader'

export default function LogInForm() {
  const [logIn, { loading, error }] = useMutation(LOG_IN, {
    refetchQueries: [{ query: GET_VIEWER }],
  })
  const errorMessage = error?.message || ''
  const isEmailValid =
    !errorMessage.includes('empty_email') &&
    !errorMessage.includes('empty_username') &&
    !errorMessage.includes('invalid_email') &&
    !errorMessage.includes('invalid_username')
  const isPasswordValid =
    !errorMessage.includes('empty_password') &&
    !errorMessage.includes('incorrect_password')
  const [validated, setValidated] = useState(false)
  const [show, setShow] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    const data = new FormData(form)
    const { email, password } = Object.fromEntries(data)

    if (form.checkValidity()) {
      logIn({
        variables: {
          login: email,
          password,
        },
      }).catch(error => {
        console.error(error)
      })

      setShow(true)
    }

    setValidated(true)
  }

  return (
    <>
      <FormHeading>Login</FormHeading>
      <FormLogin
        method="post"
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        <Fieldset disabled={loading} aria-busy={loading}>
          {show && !isEmailValid ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              Invalid email or not exists.
            </Alert>
          ) : null}
          {show && !isPasswordValid ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              Invalid password.
            </Alert>
          ) : null}

          <FloatingLabel label="Email">
            <FormLogin.Control
              id="login-email"
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Username or email"
              required
            />
          </FloatingLabel>

          <FloatingLabel label="Password">
            <FormLogin.Control
              id="login-password"
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Your password"
              required
            />
          </FloatingLabel>

          <FormRemember>
            <FormLogin.Check
              type="checkbox"
              id="remember"
              label="Remember-me"
            />
            <Link href="/forgot-password">
              <a className="forgot-password-link">Forget password?</a>
            </Link>
          </FormRemember>

          <Button
            className="w-100 btn btn-lg btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader size={8} margin={1} color="#fff" /> : 'Login'}
          </Button>
        </Fieldset>

        <hr />

        <p className="account-sign-up-cta text-center">
          You don't have an account? <br />
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </p>
      </FormLogin>
    </>
  )
}

const FormLogin = styled(Form).attrs(() => ({
  className: 'form-classes',
}))``

const FormHeading = styled.h1.attrs(() => ({
  className: 'text-center my-2 mx-0',
}))``

const FormRemember = styled.div.attrs(() => ({
  className: 'd-flex align-items-center justify-content-between my-2 mx-0',
}))``

const Fieldset = styled.fieldset.attrs(() => ({
  className: 'border-0',
}))``
