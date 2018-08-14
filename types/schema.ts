import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String! @unique
    password: String!
    email: String! @unique
    joinDate: String
    favorites: [Recipe!]
  }

  type Recipe {
    _id: ID!
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    username: String
  }

  type Query {
    getAllRecipes: [Recipe]
  }

  type Mutation {
    addRecipe(
      name: String!
      category: String!
      description: String!
      instructions: String!
      username: String
    ): Recipe
  }
`;
