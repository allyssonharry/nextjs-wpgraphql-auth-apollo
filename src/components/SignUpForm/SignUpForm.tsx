import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useState } from 'react'
import { Alert, Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'
import isStrongPassword from 'validator/lib/isStrongPassword'
import { REGISTER_USER } from '../../graphql/mutations'
import { Loader } from '../Loader'
import { SignUpSuccess } from '../SignUpForm'

export default function SignUpForm() {
  const [register, { data, loading, error }] = useMutation(REGISTER_USER)
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)
  const [validPassword, setValidPassword] = useState('')
  const wasSignUpSuccessful = Boolean(data?.registerUser?.user?.databaseId)

  /**
   * Validate password
   * @param value input password
   */
  function checkPassword(value: string) {
    const empty = !value.length
    if (
      isStrongPassword(value, {
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
    ) {
      setValidPassword('')
    } else {
      empty ? setValidPassword('') : setValidPassword('insecure')
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    const data = new FormData(form)
    const values = Object.fromEntries(data)

    if (form.checkValidity()) {
      register({
        variables: values,
      }).catch(error => {
        console.error(error)
      })
      setShow(true)
    }
    setValidated(true)
  }

  if (wasSignUpSuccessful) {
    return <SignUpSuccess />
  }

  return (
    <>
      <FormHeading>Sign up</FormHeading>
      <FormRegister
        method="post"
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        <fieldset>
          {show && error ? (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
              {error.message}
            </Alert>
          ) : (
            ''
          )}

          {/* Firstname, Lastname */}
          <Row className="gx-2">
            <Col xs={6}>
              <FloatingLabel label="Firstname">
                <FormRegister.Control
                  type="text"
                  name="firstName"
                  autoComplete="off"
                  placeholder="Firstname"
                  required
                />
              </FloatingLabel>
            </Col>
            <Col xs={6}>
              <FloatingLabel label="Lastname">
                <FormRegister.Control
                  type="text"
                  name="lastName"
                  autoComplete="off"
                  placeholder="Lastname"
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* Username */}
          <FloatingLabel label="Username">
            <FormRegister.Control
              type="text"
              name="username"
              minLength={4}
              autoComplete="off"
              placeholder="Username"
              required
            />
          </FloatingLabel>

          {/* Password */}
          <FloatingLabel
            label={
              validPassword === 'insecure' ? 'Insecure password' : 'Password'
            }
          >
            <FormRegister.Control
              type="password"
              name="password"
              minLength={6}
              maxLength={16}
              autoComplete="off"
              onChange={e => checkPassword(e.target.value)}
              placeholder={
                validPassword === 'insecure' ? 'Insecure password' : 'Password'
              }
              required
            />
          </FloatingLabel>

          {/* E-mail */}
          <FloatingLabel label="Email">
            <FormRegister.Control
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
              required
            />
          </FloatingLabel>

          <div className="d-grid gap-2">
            <Button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader size={8} margin={1} color="#fff" />
              ) : (
                'Create my account'
              )}
            </Button>
          </div>
          {error ? (
            error.message.includes('This username is already registered') ? (
              <p className="error-message">
                You&#39;re already signed up! <Link href="/login">Login</Link>
              </p>
            ) : (
              <p className="error-message">{error.message}</p>
            )
          ) : null}
        </fieldset>

        <hr />

        <p className="text-center">
          Do you already have an account?{' '}
          <Link href="/login">
            <a>Sign in</a>
          </Link>
        </p>
      </FormRegister>
    </>
  )
}

const FormHeading = styled.h1.attrs(() => ({
  className: 'text-center my-2 mx-0',
}))``

const FormRegister = styled(Form).attrs(() => ({
  className: 'form-classes',
}))``
