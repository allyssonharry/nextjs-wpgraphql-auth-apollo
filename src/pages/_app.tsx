import { ApolloProvider } from '@apollo/client'
import { AnimatePresence } from 'framer-motion'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from '../auth/useAuth'
import { client } from '../services/apollo'
import '../styles/app.scss'
import theme from '../styles/theme'

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType
  }
}

export default function MyApp({
  Component,
  pageProps,
  router,
}: ComponentWithPageLayout) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <AuthProvider>
            <AnimatePresence exitBeforeEnter>
              {Component.PageLayout ? (
                <Component.PageLayout>
                  <Component {...pageProps} key={router.route} />
                </Component.PageLayout>
              ) : (
                <Component {...pageProps} key={router.route} />
              )}
            </AnimatePresence>
          </AuthProvider>
        </ApolloProvider>
      </ThemeProvider>
    </RecoilRoot>
  )
}
