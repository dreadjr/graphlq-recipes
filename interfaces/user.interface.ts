import { Document } from 'mongoose';
import { IRecipe } from './recipe.interface';

export interface IUser extends Document {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  joinDate: Date;
  favorites: [IRecipe];
}
