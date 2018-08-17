import { gql } from 'apollo-boost';

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
    }
  }
`;
