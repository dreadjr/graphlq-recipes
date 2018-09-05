import * as React from 'react';

import { isEmpty } from '../../utils/isEmpty';

import ThemeWrapper from '../StyledComponents/MaterialUI/Theme';
import { TextField, Typography } from '@material-ui/core';
import { FormContainer } from '../StyledComponents/Form/FormContainer';

import { FormButton } from '../StyledComponents/Button/Button';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

import CategoryPicker from './CategoryPicker';

import { withRouter } from 'react-router-dom';
import { withAuth } from '../withAuth';

import {
  AddRecipeState,
  AddRecipeProps,
  AddRecipeData,
  AddRecipeVariables
} from '../../interfaces/Recipe/addRecipe.interface';

import { Mutation } from 'react-apollo';

import { InMemoryCache } from 'apollo-boost';

import { ADD_RECIPE } from '../../mutations';
import { getAllRecipes, getUserRecipes } from '../../queries';
import { getValidationErrors } from '../../utils/getValidationErrors';

class AddRecipe extends React.Component<AddRecipeProps, AddRecipeState> {
  public state: AddRecipeState = {
    name: '',
    description: '',
    instructions: '',
    category: 'Breakfast',
    username: '',
    errors: {}
  };

  public componentDidMount() {
    this.setState({ username: this.props.session.getCurrentUser.username });
  }

  public onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;

    this.setState({
      ...this.state,
      [name]: value
    });

    console.log(this.state.category);
  };

  public onAddRecipeAndRedirect = async (addRecipe: any) => {
    await addRecipe();
    this.setState({ errors: {} });
    this.props.history.push('/');
  };

  public onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>,
    addRecipe: any
  ) => {
    event.preventDefault();

    try {
      await this.onAddRecipeAndRedirect(addRecipe);
    } catch (error) {
      const { errors } = await getValidationErrors(error);
      this.setState({ errors });
    }
  };

  public validateForm = () => {
    const { name, description, instructions } = this.state;
    return isEmpty(name || description || instructions);
  };

  public updateCache = (cache: InMemoryCache, { data: { addRecipe } }: any) => {
    const { getAllRecipes: gAR } = cache.readQuery({ query: getAllRecipes });
    cache.writeQuery({
      query: getAllRecipes,
      data: {
        getAllRecipes: [addRecipe, ...gAR]
      }
    });
  };

  public render() {
    const {
      name,
      description,
      instructions,
      category,
      username,
      errors
    } = this.state;

    return (
      <Mutation<AddRecipeData, AddRecipeVariables>
        mutation={ADD_RECIPE}
        variables={{ name, description, instructions, category, username }}
        refetchQueries={() => [
          { query: getUserRecipes, variables: { username } }
        ]}
        update={this.updateCache}
      >
        {(addRecipe, { data, loading, error }) => {
          if (loading) {
            return null;
          }

          if (error) {
            return error;
          }

          return (
            <ComponentWrapper>
              <FormContainer
                onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
                  this.onSubmitHandler(event, addRecipe)
                }
              >
                <ThemeWrapper>
                  <Typography variant="display3">Add A Recipe</Typography>
                  <CategoryPicker
                    onChange={this.onChangeHandler}
                    value={category}
                  />
                  <TextField
                    error={!!errors!.name}
                    label={errors!.name ? errors!.name : 'Name'}
                    value={name}
                    margin="normal"
                    name="name"
                    onChange={this.onChangeHandler}
                  />
                  <TextField
                    error={!!errors!.description}
                    label={
                      errors!.description ? errors!.description : 'Description'
                    }
                    value={description}
                    margin="normal"
                    name="description"
                    onChange={this.onChangeHandler}
                  />
                  <TextField
                    error={!!errors!.instructions}
                    label={
                      errors!.instructions
                        ? errors!.instructions
                        : 'Instructions'
                    }
                    multiline={true}
                    rows={2}
                    rowsMax={4}
                    value={instructions}
                    margin="normal"
                    name="instructions"
                    onChange={this.onChangeHandler}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      flexDirection: 'column',
                      width: '30rem'
                    }}
                  >
                    <FormButton
                      variant="contained"
                      color="primary"
                      wide={true.toString()}
                      type="submit"
                      disabled={this.validateForm()}
                    >
                      Submit
                    </FormButton>
                  </div>
                </ThemeWrapper>
              </FormContainer>
            </ComponentWrapper>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth((session: any) => session && session.getCurrentUser)(
  withRouter(AddRecipe)
);
