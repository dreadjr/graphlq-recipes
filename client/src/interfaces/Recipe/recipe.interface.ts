export interface IRecipe {
  _id: string;
  name: string;
  category: string;
  description: string;
  instructions: string;
  createdDate: Date;
  likes: number;
  username: string;
}
