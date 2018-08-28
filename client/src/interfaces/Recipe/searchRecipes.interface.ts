export interface SearchRecipesData {
  searchRecipes: [
    {
      _id: string;
      name: string;
      likes: number;
    }
  ];
}

export interface SearchRecipesVariables {
  searchTerm: string;
}
