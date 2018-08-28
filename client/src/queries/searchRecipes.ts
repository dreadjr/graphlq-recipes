import { gql } from 'apollo-boost';

export default gql`
  query SearchRecipes($searchTerm: String!) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      likes
    }
  }
`;
