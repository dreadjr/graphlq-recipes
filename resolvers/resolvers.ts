import * as jwt from 'jsonwebtoken';
import { SECRET } from '../config/keys';

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};

export const resolvers = {
  Query: {
    getAllRecipes: async (root, {}, { Recipe }) => {
      return await Recipe.find();
    }
  },
  Mutation: {
    addRecipe: async (
      root,
      { name, description, category, instructions, username },
      { Recipe }
    ) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        username
      }).save();
      return newRecipe;
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      } else {
        const newUser = await new User({
          username,
          email,
          password
        }).save();
        return { token: createToken(newUser, SECRET, 3600) };
      }
    }
  }
};
