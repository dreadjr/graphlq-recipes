import { RouteComponentProps } from 'react-router-dom';

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
  username: string;
}

export type AddRecipeState = AddRecipeInputValues & AddRecipeInputErrors;

export interface AddRecipeProps extends RouteComponentProps<any> {
  session: any;
}

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
  username?: string;
}

export interface AddRecipeVariables {
  name: string;
  description: string;
  category: string;
  instructions: string;
  username?: string;
}
