import { gql } from 'apollo-server-express';

export default gql`
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

  type Token {
    token: String!
  }

  type Query {
    getAllRecipes: [Recipe!]!
    getCurrentUser: User
  }

  type Mutation {
    addRecipe(
      name: String!
      category: String!
      description: String!
      instructions: String!
      username: String
    ): Recipe

    getRecipe(_id: ID!): Recipe!

    deleteRecipe(_id: ID!): Boolean!

    editRecipe(
      _id: ID!
      name: String
      category: String
      description: String
      instructions: String
    ): Recipe!

    registerUser(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): Token

    loginUser(email: String!, password: String!): Token
  }
`;
