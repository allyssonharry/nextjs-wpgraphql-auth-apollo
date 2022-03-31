import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
  mutation updateProfile($id: ID!, $firstName: String!, $lastName: String!) {
    updateUser(input: { id: $id, firstName: $firstName, lastName: $lastName }) {
      user {
        databaseId
      }
    }
  }
`
