import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { FloatingLabel, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { SEND_PASSWORD_RESET_EMAIL } from '../../graphql/mutations'
import { Loader } from '../Loader'

export default function SendPasswordResetEmailForm() {
  const [validated, setValidated] = useState(false)
  const [show, setShow] = useState(false)
  const [sendPasswordResetEmail, { loading, error, data }] = useMutation(
    SEND_PASSWORD_RESET_EMAIL
  )
  const wasEmailSent = Boolean(data?.sendPasswordResetEmail?.user?.databaseId)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()

    const form = event.currentTarget
    const data = new FormData(event.currentTarget)
    const { email } = Object.fromEntries(data)

    if (form.checkValidity()) {
      sendPasswordResetEmail({
        variables: {
          username: email,
        },
      }).catch(error => {
        console.error(error)
      })
      setShow(true)
    }
    setValidated(true)
  }

  if (wasEmailSent) {
    return (
      <FormResetPasswordEmailSent>
        You will receive an email with the password reset link in some minutes.
      </FormResetPasswordEmailSent>
    )
  }

  return (
    <FormResetPassword
      method="post"
      onSubmit={handleSubmit}
      noValidate
      validated={validated}
    >
      {error ? <p className="error-message">{error.message}</p> : null}
      <fieldset disabled={loading} aria-busy={loading}>
        <FloatingLabel label="E-mail">
          <FormResetPassword.Control
            id="password-reset-email"
            className="mb-3"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
          />
        </FloatingLabel>
        <FormResetPasswordSubmit type="submit" disabled={loading}>
          {loading ? <Loader size={8} margin={1} color="#fff" /> : 'Send'}
        </FormResetPasswordSubmit>
      </fieldset>
    </FormResetPassword>
  )
}

const FormResetPassword = styled(Form).attrs(() => ({
  className: '',
}))``

const FormResetPasswordEmailSent = styled.div.attrs(() => ({
  className: 'my-3 fw-bold',
}))``

const FormResetPasswordSubmit = styled(Button).attrs(() => ({
  className: 'btn btn-lg w-100 btn-primary',
}))``
