import { Schema, model } from 'mongoose';
import { Recipe } from '../interfaces/recipe.interface';

const RecipeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  username: {
    type: String
  }
});

// This has to do with the search component
RecipeSchema.index({
  '$**': 'text'
});

export default model<Recipe>('Recipe', RecipeSchema);
