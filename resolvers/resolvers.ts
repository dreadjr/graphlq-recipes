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
    getAllRecipes: async (root, {}, { Recipe }) => await Recipe.find(),
    getCurrentUser: async (root, {}, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }

      return await User.findOne({
        email: currentUser.email
      }).populate({ path: 'favorites', model: 'Recipe' });
    }
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

    registerUser: async (root, args, { User }) => {
      const { errors, isValid } = await validateRegister(args);

      if (!isValid) {
        throw new UserInputError('Validation Error', errors);
      }

      const { username, email, password, confirmPassword } = args;

      const user = await User.findOne({ email });

      if (user) {
        errors.email = 'Email already exists';
        throw new UserInputError('Validation Error', errors);
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await new User({
          username,
          email,
          password: hashedPassword
        }).save();
        return { token: createToken(newUser, SECRET, 3600) };
      }
    },

    loginUser: async (root, args, { User }) => {
      const { errors, isValid } = await validateLogin(args);

      if (!isValid) {
        throw new UserInputError('Validation Error', errors);
      }

      const { email, password } = args;

      const user = await User.findOne({ email });

      if (!user) {
        errors.email = 'User does not exist';
        throw new UserInputError('Validation Error', errors);
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        errors.password = 'Password is incorrect';
        throw new UserInputError('Validation Error', errors);
      } else {
        return { token: createToken(user, SECRET, 3600) };
      }
    }
  }
};
