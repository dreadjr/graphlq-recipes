import { gql } from 'apollo-boost';

export default gql`
  query GetRecipe($id: String!) {
    getRecipe(id: $id) {
      _id
      name
      description
      category
      instructions
      likes
      createdDate
    }
  }
`;
