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

interface AddRecipeInputErrors {
  errors?: {
    [key: string]: AddRecipeInputValues;
  };
}

interface AddRecipeInputValues {
  name: string;
  description: string;
  instructions: string;
  category: string;
}

export type AddRecipeState = AddRecipeInputValues & AddRecipeInputErrors;
