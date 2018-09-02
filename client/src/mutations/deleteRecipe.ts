import { gql } from 'apollo-boost';

export const DELETE_USER_RECIPE = gql`
  mutation DeleteUserRecipe($_id: ID!) {
    deleteUserRecipe(_id: $_id) {
      _id
    }
  }
`;
