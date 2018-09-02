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
    likes: Int
    createdDate: String
    username: String
  }

  type Token {
    token: String!
  }

  type Query {
    getCurrentUser: User
    getAllRecipes: [Recipe!]
    getRecipe(_id: ID!): Recipe
    searchRecipes(searchTerm: String): [Recipe]
    getUserRecipes(username: String!): [Recipe]
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

    deleteUserRecipe(_id: ID!): Recipe

    editRecipe(
      _id: ID!
      name: String
      category: String
      description: String
      instructions: String
    ): Recipe!

    likeRecipe(_id: ID!, username: String!): Recipe
    unLikeRecipe(_id: ID!, username: String!): Recipe

    registerUser(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): Token

    loginUser(email: String!, password: String!): Token
  }
`;
