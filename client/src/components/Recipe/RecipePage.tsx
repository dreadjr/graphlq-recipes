import * as React from 'react';
import { Typography } from '@material-ui/core';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Query } from 'react-apollo';
import { getRecipe } from '../../queries';

import { Button } from '@material-ui/core';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

import {
  GetRecipeData,
  GetRecipeVariables
} from '../../interfaces/Recipe/recipe.interface';

const RecipePage = (props: RouteComponentProps<any>) => (
  <Query<GetRecipeData, GetRecipeVariables>
    query={getRecipe}
    variables={{ _id: props.match.params._id }}
  >
    {({ loading, data }) => {
      if (loading || !data) {
        return null;
      }

      const { getRecipe } = data;

      return (
        <ComponentWrapper style={{ flexDirection: 'column' }}>
          <Typography onClick={() => console.log(props)}>
            {getRecipe.name}
          </Typography>
          <Typography>Category: {getRecipe.category}</Typography>
          <Typography>{getRecipe.description}</Typography>
          <Typography>{getRecipe.instructions}</Typography>
          <Typography>Likes: {getRecipe.likes}</Typography>
          <Typography>Created By: {getRecipe.username}</Typography>
          <Button>Like</Button>
        </ComponentWrapper>
      );
    }}
  </Query>
);

export default withRouter(RecipePage);
