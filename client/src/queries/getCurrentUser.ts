import gql from 'graphql-tag';

export default gql`
  query GetCurrentUser {
    getCurrentUser {
      username
      email
      joinDate
      favorites {
        _id
        name
      }
    }
  }
`;
