import { Document } from 'mongoose';
import { RecipeImp } from './recipe.interface';

export interface UserImp extends Document {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  joinDate: Date;
  favorites: [RecipeImp];
  isAdmin: boolean;
}

export interface AuthErrorsImp {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
