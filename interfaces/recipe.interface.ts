import { Document } from 'mongoose';

export interface IRecipe extends Document {
  name: string;
  category: string;
  description: string;
  instructions: string;
  createdDate: Date;
  likes: number;
  username: string;
}
