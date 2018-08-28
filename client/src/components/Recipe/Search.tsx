import * as React from 'react';
import { TextField, Typography } from '@material-ui/core';

import searchRecipes from '../../queries/searchRecipes';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

import { Query } from 'react-apollo';

import {
  SearchRecipesData,
  SearchRecipesVariables
} from '../../interfaces/Recipe/searchRecipes.interface';
import { IRecipe } from '../../interfaces/Recipe/recipe.interface';

export default () => (
  <Query<SearchRecipesData, SearchRecipesVariables>
    query={searchRecipes}
    variables={{ searchTerm: '' }}
  >
    {({ data, loading, error }) => {
      if (loading || !data) {
        return null;
      }

      if (error) {
        return <>Error</>;
      }

      return (
        <>
          <ComponentWrapper>
            <TextField
              label={'Search Recipes'}
              margin="normal"
              name="instructions"
            />
            <ul>
              {data.searchRecipes.map((recipe: IRecipe) => {
                <li key={recipe._id}>
                  <Typography>{recipe.name}</Typography>
                  <Typography>{recipe.likes}</Typography>
                </li>;
              })}
            </ul>
          </ComponentWrapper>
        </>
      );
    }}
  </Query>
);
