import { RefetchQueriesProviderFn } from 'react-apollo';
import { IRecipe } from '../Recipe/recipe.interface';

export interface LikeRecipeProps {
  session: {
    getCurrentUser: {
      username: string;
      favorites: [IRecipe];
    };
  };
  _id: string;
  refetch: RefetchQueriesProviderFn;
}

export interface LikeRecipeState {
  liked: boolean;
  username: string;
}

export interface LikeRecipeVariables {
  _id: string;
  username: string;
}

export interface UnLikeRecipeVariables {
  _id: string;
  username: string;
}
