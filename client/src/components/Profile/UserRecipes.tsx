import * as React from 'react';
import { Query, Mutation } from 'react-apollo';

import { InMemoryCache } from 'apollo-boost';

import {
  UserRecipesProps,
  UserRecipesVariables,
  UserRecipesData
} from '../../interfaces/Profile/userRecipes.interface';

import { IRecipe } from '../../interfaces/Recipe/recipe.interface';

import { getUserRecipes, getAllRecipes, getCurrentUser } from '../../queries';
import { DELETE_USER_RECIPE } from '../../mutations';

import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export class UserRecipes extends React.Component<UserRecipesProps, {}> {
  public onDeleteHandler = async (deleteUserRecipe: any) => {
    const confirmDelete = await window.confirm(
      'Are you sure you want to delete this recipe?'
    );

    if (confirmDelete) {
      await deleteUserRecipe();
    }
  };

  public render() {
    const { username } = this.props;

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

          return (
            <>
              <Typography variant="display3">Your Recipes</Typography>
              {!data.getUserRecipes.length && (
                <Typography>You have no added any recipes yet!</Typography>
              )}
              {data.getUserRecipes.map((recipe: IRecipe) => (
                <li
                  key={recipe._id}
                  style={{ listStyle: 'none', textAlign: 'center' }}
                >
                  <Link to={`/recipe/${recipe._id}`}>
                    <Typography variant="display2">
                      Name: {recipe.name}
                    </Typography>
                  </Link>
                  <Typography variant="display1" style={{ padding: '1rem 0' }}>
                    Likes: {recipe.likes}
                  </Typography>

                  <Mutation<UserRecipesVariables>
                    mutation={DELETE_USER_RECIPE}
                    variables={{ _id: recipe._id }}
                    refetchQueries={() => [
                      { query: getAllRecipes },
                      { query: getCurrentUser }
                    ]}
                    update={(
                      cache: InMemoryCache,
                      { data: { deleteUserRecipe } }: any
                    ) => {
                      const { getUserRecipes: gUR } = cache.readQuery({
                        query: getUserRecipes,
                        variables: { username }
                      });

                      cache.writeQuery({
                        query: getUserRecipes,
                        variables: { username },
                        data: {
                          getUserRecipes: gUR.filter(
                            (recipe: IRecipe) =>
                              recipe._id !== deleteUserRecipe._id
                          )
                        }
                      });
                    }}
                  >
                    {(deleteUserRecipe, attrs: { loading: boolean }) => (
                      <Typography
                        variant="display1"
                        style={{ padding: '1rem 0' }}
                        onClick={() => this.onDeleteHandler(deleteUserRecipe)}
                      >
                        {attrs.loading ? 'Deleting...' : 'X'}
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
  }
}
