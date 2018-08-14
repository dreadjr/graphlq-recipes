import * as React from 'react';

import { GET_ALL_RECIPES } from '../../queries/index';
import { Query } from 'react-apollo';

export default class Home extends React.Component {
  public render() {
    return (
      <div>
        <h1>Home</h1>
        <Query query={GET_ALL_RECIPES}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading</div>;
            if (error) return <div>Error</div>;

            return <p>Recipes</p>;
          }}
        </Query>
      </div>
    );
  }
}
