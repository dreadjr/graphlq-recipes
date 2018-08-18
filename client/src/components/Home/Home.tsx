import * as React from 'react';
import { getAllRecipes } from '../../queries';

import { Query } from 'react-apollo';

import RecipeItem from '../Recipe/RecipeItem';

// import { withRouter, RouteComponentProps } from 'react-router-dom';

// interface HomeProps extends RouteComponentProps<any> {

// }

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

            return (
              <ul>
                {data.getAllRecipes.map((recipe: any) => (
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
