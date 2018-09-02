import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  UserRecipesProps,
  UserRecipesVariables,
  UserRecipesData
} from '../../interfaces/Profile/userRecipes.interface';

import { IRecipe } from '../../interfaces/Recipe/recipe.interface';

import { getUserRecipes } from '../../queries';
import { DELETE_USER_RECIPE } from '../../mutations';

import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const onDeleteHandler = async (deleteUserRecipe: any) => {
  const confirmDelete = await window.confirm(
    'Are you sure you want to delete this recipe?'
  );

  if (confirmDelete) {
    const data = await deleteUserRecipe();
    console.log(data);
  }
};

export default (props: UserRecipesProps) => {
  const { username } = props;

  return (
    <Query<UserRecipesData, UserRecipesVariables>
      query={getUserRecipes}
      variables={{ username }}
    >
      {({ data, loading, error }) => {
        if (error) {
          return <div>error</div>;
        }

        if (loading || !data) {
          return <div>Loading</div>;
        }

        console.log(data);

        return (
          <>
            <Typography variant="display3">Your Recipes</Typography>
            {data.getUserRecipes.map((recipe: IRecipe) => (
              <li
                key={recipe._id}
                style={{ listStyle: 'none', textAlign: 'center' }}
              >
                <Link to={`/recipe/${recipe._id}`}>
                  <Typography variant="display2">{recipe.name}</Typography>
                </Link>
                <Typography variant="display1" style={{ padding: '1rem 0' }}>
                  Likes: {recipe.likes}
                </Typography>

                <Mutation<UserRecipesVariables>
                  mutation={DELETE_USER_RECIPE}
                  variables={{ _id: recipe._id }}
                >
                  {deleteUserRecipe => (
                    <Typography
                      variant="display1"
                      style={{ padding: '1rem 0' }}
                      onClick={() => onDeleteHandler(deleteUserRecipe)}
                    >
                      X
                    </Typography>
                  )}
                </Mutation>
              </li>
            ))}
          </>
        );
      }}
    </Query>
  );
};
