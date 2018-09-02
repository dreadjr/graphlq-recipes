export interface LikeRecipeProps {
  session: {
    getCurrentUser: {
      username: string;
    };
  };
  _id: string;
}

export interface LikeRecipeVariables {
  _id: string;
  username: string;
}
