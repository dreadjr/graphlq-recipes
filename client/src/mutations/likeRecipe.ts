import { gql } from 'apollo-boost';

export const LIKE_RECIPE = gql`
  mutation LikeRecipe($_id: ID!, $username: String!) {
    likeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;

export const UNLIKE_RECIPE = gql`
  mutation UnlikeRecipe($_id: ID!, $username: String!) {
    unLikeRecipe(_id: $_id, username: $username) {
      _id
      likes
    }
  }
`;
