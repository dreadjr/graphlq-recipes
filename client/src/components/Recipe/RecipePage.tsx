import * as React from 'react';
import { Typography } from '@material-ui/core';

import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Query } from 'react-apollo';
import { getRecipe } from '../../queries';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

import {
  GetRecipeData,
  GetRecipeVariables
} from '../../interfaces/Recipe/recipe.interface';

import LikeRecipe from './LikeRecipe';

const RecipePage = (props: RouteComponentProps<any>) => {
  const { _id } = props.match.params;

  return (
    <Query<GetRecipeData, GetRecipeVariables>
      query={getRecipe}
      variables={{ _id }}
    >
      {({ loading, data }) => {
        if (loading || !data) {
          return null;
        }

        const { getRecipe } = data;

        return (
          <ComponentWrapper
            style={{ flexDirection: 'column', alignItems: 'center' }}
          >
            <Typography variant="display1">Name: {getRecipe.name}</Typography>
            <Typography variant="display1">
              Category: {getRecipe.category}
            </Typography>
            <Typography variant="display1">
              Description: {getRecipe.description}
            </Typography>
            <Typography variant="display1">
              Instructions: {getRecipe.instructions}
            </Typography>
            <Typography variant="display1">Likes: {getRecipe.likes}</Typography>
            <Typography variant="display1">
              Created By: {getRecipe.username}
            </Typography>
            <LikeRecipe _id={_id} />
          </ComponentWrapper>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
