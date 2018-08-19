import gql from 'graphql-tag';

export const ADD_RECIPE = gql`
  mutation AddRecipe($name: String!, $description: String!, $category: String!, $instructions: String! ) {
    addRecipe(name: $name, description: $description, category; $category, instructions: $instructions) {
      name
      description
      category
      instructions
    }
  }
`;
