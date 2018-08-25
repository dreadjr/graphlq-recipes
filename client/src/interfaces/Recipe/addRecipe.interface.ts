import { RouteComponentProps } from 'react-router-dom';

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
