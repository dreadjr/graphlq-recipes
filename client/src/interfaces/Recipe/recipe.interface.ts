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

export interface GetAllRecipeData {
  getAllRecipes: [
    {
      _id: string;
      name: string;
      category: string;
    }
  ];
}

export interface GetRecipeData {
  getRecipe: {
    _id: string;
    name: string;
    category: string;
    description: string;
    instructions: string;
    likes: number;
    username: string;
  };
}

export interface GetRecipeVariables {
  _id: string;
}

export interface AddRecipeData {
  name: string;
  description: string;
  category: string;
  instructions: string;
}

export interface AddRecipeVariables extends AddRecipeData {}
