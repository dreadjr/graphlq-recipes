import * as React from 'react';
import { getAllRecipes } from '../../queries';

import { Query } from 'react-apollo';

// import Register from '../Register/Register';

// import { ChildProps } from 'react-apollo';

// import { IRecipe } from '../../interfaces/Recipe/recipe.interface';

class Home extends React.Component {
  public render() {
    return (
      <>
        <h1>Home</h1>
        <Query query={getAllRecipes}>
          {({ data, loading, error }) => {
            if (loading) {
              return null;
            }

            if (error) {
              return <div>{error}</div>;
            }

            console.log(data);

            return <p>Recipes</p>;
          }}
        </Query>
      </>
    );
  }
}

export default Home;
