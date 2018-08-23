import * as React from 'react';
import { getAllRecipes } from '../../queries';

import { Query } from 'react-apollo';

import RecipeItem from '../Recipe/RecipeItem';

import {
  IRecipe,
  GetAllRecipeData
} from '../../interfaces/Recipe/recipe.interface';

class Home extends React.Component {
  public render() {
    return (
      <>
        <h1>Home</h1>
        <Query<GetAllRecipeData> query={getAllRecipes}>
          {({ data, loading, error }) => {
            if (loading || !data) {
              return null;
            }

            if (error) {
              return <div>{error}</div>;
            }

            return (
              <ul>
                {data.getAllRecipes.map((recipe: IRecipe) => (
                  <RecipeItem key={recipe._id} {...recipe} />
                ))}
              </ul>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Home;
