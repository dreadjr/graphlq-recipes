export interface IRecipe {
  _id: string;
  name: string;
  category: string;
  description: string;
  instructions: string;
  createdDate?: Date;
  likes: number;
  username: string;
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
  getRecipe: IRecipe;
}

export interface GetRecipeVariables {
  _id: string;
}
