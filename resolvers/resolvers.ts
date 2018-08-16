import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { SECRET } from '../config/keys';
import { UserInputError } from 'apollo-server-express';

import { validateRegister } from '../validation/register';
import { validateRecipe } from '../validation/recipe';
import { validateLogin } from '../validation/login';

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};

export const resolvers = {
  Query: {
    getAllRecipes: async (root, {}, { Recipe }) => await Recipe.find()
  },
  Mutation: {
    addRecipe: async (root, args, { Recipe }) => {
      const { errors, isValid } = await validateRecipe(args);

      if (!isValid) {
        throw new UserInputError('Validation Error', errors);
      }

      const { name, description, category, instructions } = args;

      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions
      }).save();
      return newRecipe;
    },

    getRecipe: async (root, { _id }, { Recipe }) =>
      await Recipe.findById({ _id }),

    deleteRecipe: async (root, { _id }, { Recipe }) =>
      await Recipe.findByIdAndRemove({ _id }),

    editRecipe: async (root, args, { Recipe }) =>
      await Recipe.findByIdAndUpdate(
        args._id,
        {
          $set: {
            ...args
          }
        },
        { new: true }
      ),

    signupUser: async (root, args, { User }) => {
      const { errors, isValid } = await validateRegister(args);

      if (!isValid) {
        throw new UserInputError('Validation Error', errors);
      }

      const { username, email, password } = args;

      const user = await User.findOne({ username });

      if (user) {
        errors.email = 'User already exists';
        throw new UserInputError('Validation Error', errors);
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await new User({
          username,
          email,
          hashedPassword
        }).save();
        return { token: createToken(newUser, SECRET, 3600) };
      }
    }

    // loginUser: async (root, args, { User }) => {
    //   const { errors, isValid } = await validateLogin(args);

    //   if (!isValid) {
    //     throw new UserInputError('Validation Error', errors);
    //   }

    //   const { email, password } = args;

    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     errors.email = 'User does not exist';
    //     throw new UserInputError('Validation Error', errors);
    //   }

    //   const valid = await bcrypt.compare(password, user.password);

    //   if (!valid) {
    //     errors.password = 'Password is incorrect'
    //     throw new UserInputError('Validation Error', errors);
    //   } else {
    //     return { token: createToken({ email }, SECRET, 3600) };
    //   }
    // }
  }
};
