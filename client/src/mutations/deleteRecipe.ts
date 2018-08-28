import { gql } from 'apollo-boost';

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: String!) {
    deleteRecipe(id: $id) {
      _id
      name
      description
      category
      instructions
      username
    }
  }
`;
