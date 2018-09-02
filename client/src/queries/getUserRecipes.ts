import { gql } from 'apollo-boost';

export default gql`
  query GetUserRecipes($username: String!) {
    getUserRecipes(username: $username) {
      _id
      name
      likes
    }
  }
`;
