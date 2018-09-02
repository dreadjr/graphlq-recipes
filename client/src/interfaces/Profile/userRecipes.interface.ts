export interface UserRecipesProps {
  username?: string;
  _id?: string;
}

export interface UserRecipesVariables {
  username?: string;
  _id?: string;
}

export interface UserRecipesData {
  getUserRecipes: [
    {
      _id: string;
      name: string;
      likes: number;
    }
  ];
}
