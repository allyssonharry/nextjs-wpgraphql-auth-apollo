import {
  ApolloClient,
  NormalizedCacheObject,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
// import { relayStylePagination } from '@apollo/client/utilities'

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WP_API_URL,
  credentials: 'include',
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // posts: relayStylePagination(),
      },
    },
  },
})

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: cache,
  link,
})
