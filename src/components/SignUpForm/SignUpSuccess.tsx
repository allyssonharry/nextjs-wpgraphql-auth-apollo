import styled from 'styled-components'
// import { Container, Row, Col } from 'react-bootstrap'

export default function SignUpSuccess() {
  return (
    <SuccessWrapper>
      <Heading>Thanks for signup!</Heading>
      <p className="mb-0">
        Email confirmation sent to: <strong>%email%</strong>.
      </p>
    </SuccessWrapper>
  )
}

const SuccessWrapper = styled.div.attrs(() => ({
  className: '',
}))``

const Heading = styled.div.attrs(() => ({
  className: 'display-5 fw-bold',
}))``
