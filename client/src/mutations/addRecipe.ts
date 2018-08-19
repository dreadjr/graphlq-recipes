import { gql } from 'apollo-boost';

export const ADD_RECIPE = gql`
  mutation AddRecipe(
    $name: String!
    $description: String!
    $category: String!
    $instructions: String!
    $username: String
  ) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      instructions: $instructions
      username: $username
    ) {
      _id
      name
      description
      category
      instructions
      username
    }
  }
`;
