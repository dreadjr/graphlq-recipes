import * as React from 'react';

// import { GetAllRecipesQuery } from '../schemaTypes/schemaTypes';
import { getAllRecipes } from '../../queries';

import { graphql } from 'react-apollo';

import Register from '../Register/Register';

import { ChildProps } from 'react-apollo';

import { IRecipe } from '../../interfaces/Recipe/recipe.interface';

class Home extends React.Component<ChildProps<any, any>> {
  public render() {
    console.log(this.props);

    let homeData;

    if (this.props.data.loading) {
      homeData = <div>Loading...</div>;
    } else {
      console.log(this.props.data.getAllRecipes);
      this.props.data.getAllRecipes.map((recipe: IRecipe) => {
        homeData = (
          <div>
            <h1 onClick={() => console.log(this.props)}>Home</h1>
            <Register />
            <React.Fragment key={recipe._id}>
              <div
                onClick={() => this.props.history.push(`/recipe/${recipe._id}`)}
              >
                {recipe._id}
              </div>
              <div style={{ textAlign: 'center' }}>{recipe.name}</div>
            </React.Fragment>
          </div>
        );
      });
    }

    return homeData;
  }
}

export default graphql<{}, any>(getAllRecipes)(Home);
