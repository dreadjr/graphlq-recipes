import { Document } from 'mongoose';

export interface Recipe extends Document {
  name: string;
  category: string;
  description: string;
  instructions: string;
  createdDate: Date;
  likes: number;
  username: string;
}

export interface RecipeValidationErrors {
  name?: string;
  description?: string;
  category?: string;
  instructions?: string;
}
