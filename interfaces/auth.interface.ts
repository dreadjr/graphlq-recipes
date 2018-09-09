import { Document } from 'mongoose';
import { Recipe } from './recipe.interface';

export interface UserImp extends Document {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  joinDate: Date;
  favorites: [Recipe];
  isAdmin: boolean;
}

export interface AuthErrorsImp {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
