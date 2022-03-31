import { gql } from '@apollo/client'

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount($id: ID!, $email: String!) {
    updateUser(input: { id: $id, email: $email }) {
      user {
        databaseId
      }
    }
  }
`

export const UPDATE_PASSWORD = gql`
  mutation resetUserPassword(
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: { key: $key, login: $login, password: $password }
    ) {
      user {
        databaseId
      }
    }
  }
`
