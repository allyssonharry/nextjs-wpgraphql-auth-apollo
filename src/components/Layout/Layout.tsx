import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'
// import useAuth from '../../hooks/useAuth'
export default function Layout({ children }: { children: ReactNode }) {
  // const { loading, loggedIn } = useAuth()

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.2,
    },
  }

  const pageTransition = {
    duration: 0.2,
    type: 'tween',
  }

  return (
    <Main>
      <Container>
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </motion.div>
      </Container>
    </Main>
  )
}

const Main = styled.main.attrs(() => ({
  className: 'd-flex flex-column',
}))``
