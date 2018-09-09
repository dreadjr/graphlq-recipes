import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { SECRET } from '../config/keys';
import { UserInputError } from 'apollo-server-express';

import { validateRegister } from '../validation/register';
import { validateRecipe } from '../validation/recipe';
import { validateLogin } from '../validation/login';

const createToken = (user, secret, expiresIn) => {
  const { username, email, isAdmin } = user;

  return jwt.sign({ username, email, isAdmin }, secret, { expiresIn });
};

export const resolvers = {
  Query: {
    getAllRecipes: async (root, {}, { Recipe }) =>
      await Recipe.find().sort({ createdDate: 'DESC' }),

    getUserRecipes: async (root, { username }, { Recipe }) =>
      await Recipe.find({ username }).sort({
        createdDate: 'DESC'
      }),

    getCurrentUser: async (root, {}, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }

      return await User.findOne({
        email: currentUser.email
      }).populate({ path: 'favorites', model: 'Recipe' });
    },

    getAllUsers: async (root, {}, { User }) => await User.find(),

    getRecipe: async (root, { _id }, { Recipe }) =>
      await Recipe.findOne({ _id }),

    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        return await Recipe.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: 'textScore' }
          }
        ).sort({
          score: { $meta: 'textScore' }
        });
      } else {
        return await Recipe.find().sort({ likes: 'desc', createdDate: 'desc' });
      }
    }
  },
  Mutation: {
    addRecipe: async (root, args, { Recipe }) => {
      const { errors, isValid } = await validateRecipe(args);

      if (!isValid) {
        throw new UserInputError('Validation Error', errors);
      }

      const { name, description, category, instructions, username } = args;

      const newRecipe = new Recipe({
        name,
        description,
        category,
        instructions,
        username
      }).save();
      return newRecipe;
    },

    getRecipe: async (root, { _id }, { Recipe }) =>
      await Recipe.findById({ _id }),

    deleteUserRecipe: async (root, { _id }, { Recipe }) =>
      await Recipe.findOneAndRemove({ _id }),

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

    likeRecipe: async (root, { _id, username }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate(
        { _id },
        {
          $inc: {
            likes: 1
          }
        }
      );

      const user = await User.findOneAndUpdate(
        { username },
        {
          $addToSet: {
            favorites: _id
          }
        }
      );

      return recipe;
    },

    unLikeRecipe: async (root, { _id, username }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate(
        { _id },
        {
          $inc: {
            likes: -1
          }
        }
      );

      const user = await User.findOneAndUpdate(
        { username },
        {
          $pull: {
            favorites: _id
          }
        }
      );

      return recipe;
    },

    registerUser: async (root, args, { User }) => {
      const { errors, isValid } = await validateRegister(args);

      if (!isValid) {
        throw new UserInputError('Validation Error', errors);
      }

      const { username, email, password, confirmPassword, isAdmin } = args;

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
          password: hashedPassword,
          isAdmin
        }).save();
        return { token: createToken(newUser, SECRET, '1hr') };
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
        return { token: createToken(user, SECRET, '1hr') };
      }
    }
  }
};
