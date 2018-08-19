import * as React from 'react';

import ThemeWrapper from '../StyledComponents/MaterialUI/Theme';
import {
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { FormContainer } from '../StyledComponents/Form/FormContainer';
import { FormButton } from '../StyledComponents/Button/Button';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

import {
  AddRecipeState,
  AddRecipeData,
  AddRecipeVariables
} from '../../interfaces/Recipe/recipe.interface';

import Toggle from '../Toggle/Toggle';

import { Mutation } from 'react-apollo';
import { ADD_RECIPE } from '../../mutations';

class AddRecipe extends React.Component<{}, AddRecipeState> {
  public state: AddRecipeState = {
    name: '',
    description: '',
    instructions: '',
    category: '',
    errors: {}
  };

  public onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;

    this.setState({
      ...this.state,
      [name]: value
    });
  };

  public render() {
    const { name, description, instructions, category, errors } = this.state;

    return (
      <Mutation<AddRecipeData, AddRecipeVariables>
        mutation={ADD_RECIPE}
        variables={{ name, description, instructions, category }}
      >
        {({ loading }: any) => {
          if (loading) {
            return null;
          }

          return (
            <ComponentWrapper>
              <FormContainer onSubmit={event => console.log(event)}>
                <ThemeWrapper>
                  <Typography variant="display3">Recipe Book</Typography>
                  <TextField
                    error={!!errors!.name}
                    label={errors!.name ? errors!.name : 'Name'}
                    value={name}
                    margin="normal"
                    name="name"
                    onChange={this.onChangeHandler}
                  />
                  <TextField
                    type="description"
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
                    type="instructions"
                    error={!!errors!.instructions}
                    label={
                      errors!.instructions
                        ? errors!.instructions
                        : 'Instructions'
                    }
                    value={instructions}
                    margin="normal"
                    name="instructions"
                    onChange={this.onChangeHandler}
                  />
                  <InputLabel htmlFor="demo-controlled-open-select">
                    Category
                  </InputLabel>
                  <Toggle>
                    {({ on, onToggle }) => {
                      return (
                        <Select
                          onClose={onToggle}
                          onOpen={onToggle}
                          open={on}
                          value={category}
                          name="category"
                          onChange={this.onChangeHandler}
                          inputProps={{
                            name: 'age',
                            id: 'demo-controlled-open-select'
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={'Breakfast'}>Breakfast</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      );
                    }}
                  </Toggle>
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
                      onClick={() => console.log(this.props)}
                      type="submit"
                    >
                      Add Recipe
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

export default AddRecipe;
