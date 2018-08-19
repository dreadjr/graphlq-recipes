import * as React from 'react';
import { REGISTER_USER } from '../../mutations';
import { Mutation } from 'react-apollo';
import {
  RegisterState,
  RegisterProps,
  RegisterData,
  RegisterVariables
} from '../../interfaces/Register/register.interface';
import { isEmpty } from '../../utils/isEmpty';

import { withRouter, Link } from 'react-router-dom';

import ThemeWrapper from '../StyledComponents/MaterialUI/Theme';
import { TextField, Typography } from '@material-ui/core';
import { FormContainer } from '../StyledComponents/Form/FormContainer';
import { FormButton } from '../StyledComponents/Button/Button';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

class Register extends React.Component<RegisterProps, RegisterState> {
  public state: RegisterState = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    errors: {}
  };

  public onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    this.setState({
      ...this.state,
      [name]: value
    });
  };

  public onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>,
    registerUser: any
  ) => {
    event.preventDefault();
    try {
      await registerUser();
      this.setState({ errors: {} });
      this.props.history.push('/login');
    } catch (error) {
      const {
        graphQLErrors: [
          {
            extensions: { exception: errors }
          }
        ]
      } = error;

      this.setState({ errors });
    }
  };

  public validateForm = () => {
    const { email, username, password, confirmPassword } = this.state;
    return isEmpty(email || username || password || confirmPassword);
  };

  public render() {
    const { email, username, password, confirmPassword, errors } = this.state;

    return (
      <>
        <Mutation<RegisterData, RegisterVariables>
          mutation={REGISTER_USER}
          variables={{ email, username, password, confirmPassword }}
        >
          {(registerUser, { loading }) => {
            return (
              <ComponentWrapper>
                <FormContainer
                  onSubmit={event => this.onSubmitHandler(event, registerUser)}
                >
                  <ThemeWrapper>
                    <Typography variant="display3">Recipe Book</Typography>
                    <TextField
                      error={!!errors!.username}
                      label={errors!.username ? errors!.username : 'Username'}
                      value={username}
                      margin="normal"
                      name="username"
                      onChange={this.onChangeHandler}
                    />
                    <TextField
                      error={!!errors!.email}
                      label={errors!.email ? errors!.email : 'Email'}
                      value={email}
                      margin="normal"
                      name="email"
                      onChange={this.onChangeHandler}
                    />
                    <TextField
                      type="password"
                      error={!!errors!.password}
                      label={errors!.password ? errors!.password : 'Password'}
                      value={password}
                      margin="normal"
                      name="password"
                      onChange={this.onChangeHandler}
                    />
                    <TextField
                      type="password"
                      error={!!errors!.confirmPassword}
                      label={
                        errors!.confirmPassword
                          ? errors!.confirmPassword
                          : 'Confirm Password'
                      }
                      value={confirmPassword}
                      margin="normal"
                      name="confirmPassword"
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
                        Register
                      </FormButton>
                      <Link to="/login">
                        <FormButton
                          variant="contained"
                          color="primary"
                          wide={true.toString()}
                        >
                          Or Login
                        </FormButton>
                      </Link>
                    </div>
                  </ThemeWrapper>
                </FormContainer>
              </ComponentWrapper>
            );
          }}
        </Mutation>
      </>
    );
  }
}

export default withRouter(Register);
