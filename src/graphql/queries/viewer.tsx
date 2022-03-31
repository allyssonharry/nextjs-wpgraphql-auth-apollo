import { gql } from '@apollo/client'

export const GET_VIEWER = gql`
  query getViewer {
    viewer {
      id
      databaseId
      firstName
      lastName
      email
      description
      url
      registeredDate
      uri
      capabilities
    }
  }
`
