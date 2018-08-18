import { gql } from 'apollo-boost';

export default gql`
  query GetRecipe($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      category
      description
      instructions
      likes
      createdDate
    }
  }
`;
