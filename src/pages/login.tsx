import React from 'react'
import styled from 'styled-components'
import { Layout } from '../components/Layout'
import { UnAuthContent } from '../components/UnAuthContent'
import { LogInForm } from '../components/LogInForm'

export default function LogIn() {
  return (
    <Layout>
      <UnAuthContent>
        <LoginWrapper>
          <LogInForm />
        </LoginWrapper>
      </UnAuthContent>
    </Layout>
  )
}

const LoginWrapper = styled.div.attrs(() => ({
  className: 'mt-5 mx-auto mb-0',
}))``
