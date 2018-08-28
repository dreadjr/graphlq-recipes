import * as React from 'react';
import { TextField } from '@material-ui/core';

import searchRecipes from '../../queries/searchRecipes';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

import ThemeWrapper from '../StyledComponents/MaterialUI/Theme';

import { ApolloConsumer } from 'react-apollo';

import { IRecipe } from '../../interfaces/Recipe/recipe.interface';

import SearchItem from './SearchItem';

export class Search extends React.Component {
  public state = {
    searchResults: []
  };

  public onChangeHandler = ({ searchRecipes }: any) => {
    this.setState({
      searchResults: searchRecipes
    });
  };

  public render() {
    const { searchResults } = this.state;

    return (
      <ApolloConsumer>
        {client => (
          <>
            <ComponentWrapper>
              <ThemeWrapper>
                <TextField
                  label={'Search Recipes'}
                  margin="normal"
                  name="instructions"
                  onChange={async event => {
                    event.persist();
                    const { data } = await client.query({
                      query: searchRecipes,
                      variables: { searchTerm: event.currentTarget.value }
                    });
                    this.onChangeHandler(data);
                  }}
                />
              </ThemeWrapper>
            </ComponentWrapper>
            <ul>
              <ComponentWrapper
                style={{ flexDirection: 'column', alignItems: 'center' }}
              >
                {searchResults.map((recipe: IRecipe) => (
                  <SearchItem key={recipe._id} {...recipe} />
                ))}
              </ComponentWrapper>
            </ul>
          </>
        )}
      </ApolloConsumer>
    );
  }
}
