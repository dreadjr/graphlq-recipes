import { gql } from 'apollo-boost';

export default gql`
  query GetAllRecipes {
    getAllRecipes {
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
