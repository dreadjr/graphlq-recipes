import * as Validator from 'validator';
import { isEmpty } from './isEmpty';
import { Recipe, RecipeErrors } from '../interfaces/recipe.interface';

export const validateRecipe = (recipe: Recipe) => {
  const errors: RecipeErrors = {};

  recipe.name = !isEmpty(recipe.name) ? recipe.name : '';
  recipe.description = !isEmpty(recipe.description) ? recipe.description : '';
  recipe.category = !isEmpty(recipe.category) ? recipe.category : '';
  recipe.instructions = !isEmpty(recipe.instructions)
    ? recipe.instructions
    : '';

  if (Validator.isEmpty(recipe.name)) {
    errors.name = 'Name is required';
  }

  if (Validator.isEmpty(recipe.description)) {
    errors.description = 'Description is required';
  }

  if (Validator.isEmpty(recipe.category)) {
    errors.description = 'Category is required';
  }

  if (Validator.isEmpty(recipe.instructions)) {
    errors.instructions = 'Instructions are required';
  }

  return { errors, isValid: isEmpty(errors) };
};
