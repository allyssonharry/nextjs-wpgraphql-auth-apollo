import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap'
import styled from 'styled-components'
import isStrongPassword from 'validator/lib/isStrongPassword'
import { RESET_PASSWORD } from '../../graphql/mutations'

interface Props {
  resetKey: string
  login: string
}

export default function SetPassword({ resetKey: key, login }: Props) {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [validPassword, setValidPassword] = useState('')
  const [clientErrorMessage, setClientErrorMessage] = useState('')
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD)
  const [validated, setValidated] = useState(false)
  const [show, setShow] = useState(false)
  const wasPasswordReset = Boolean(data?.resetUserPassword?.user?.databaseId)

  useEffect(() => {
    if (password.length) {
      checkPassword(password)
    } else {
      checkPassword('')
    }
  }, [password])

  /**
   * Validate password
   * @param value input password
   */
  function checkPassword(value: string) {
    const empty = !value.length

    if (
      isStrongPassword(value, {
        minLength: 4,
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

    if (form.checkValidity()) {
      resetPassword({
        variables: {
          key,
          login,
          password,
        },
      }).catch(error => {
        console.error(error)
      })

      setShow(true)
    }

    setValidated(true)
  }

  function validate() {
    setClientErrorMessage('')
    const isPasswordLongEnough = password.length >= 6
    if (!isPasswordLongEnough) {
      setClientErrorMessage('A senha deve ter no mínimo caracteres')
      return false
    }
    const doPasswordsMatch = password === passwordConfirm
    if (!doPasswordsMatch) {
      setClientErrorMessage('As senhas não correspondem')
      return false
    }

    return true
  }

  if (wasPasswordReset) {
    return (
      <>
        <p>Sua senha foi atualizada!</p>
        <Link href="/login">
          <a>Entrar</a>
        </Link>
      </>
    )
  }

  return (
    <ResetPasswordWrapper>
      <SetPasswordForm
        method="post"
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          {show && error ? (
            <FormAlert
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              {error.message}
            </FormAlert>
          ) : null}
          {/* http://localhost:3000/reset-password/eE07W50jjxLm25GHBThJ/valeria */}
          {show && !clientErrorMessage ? (
            <FormAlert
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              {clientErrorMessage}
            </FormAlert>
          ) : null}

          <Floating label="Senha">
            <SetPasswordForm.Control
              id="new-password"
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Senha"
              onChange={event => setPassword(event.target.value)}
              required
            />
            {validPassword === 'insecure' ? (
              <PasswordStrength>Senha insegura...</PasswordStrength>
            ) : (
              ''
            )}
          </Floating>

          <Floating label="Confirmar Senha">
            <SetPasswordForm.Control
              id="password-confirm"
              type="password"
              value={passwordConfirm}
              autoComplete="off"
              placeholder="Confirmar Senha"
              onChange={event => setPasswordConfirm(event.target.value)}
              required
            />
          </Floating>

          <Submit
            className="btn btn-primary btn-lg w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Redefinir Senha'}
          </Submit>
        </fieldset>
      </SetPasswordForm>
    </ResetPasswordWrapper>
  )
}

const ResetPasswordWrapper = styled.div`
  @media (min-width: 768px) {
    width: 100%;
    max-width: 400px;
    padding: 1rem;
    margin: auto;
  }
`
const SetPasswordForm = styled(Form)``
const Floating = styled(FloatingLabel)`
  margin-bottom: 1rem;
`
const FormAlert = styled(Alert)``
const Submit = styled(Button)``
const PasswordStrength = styled.div``
