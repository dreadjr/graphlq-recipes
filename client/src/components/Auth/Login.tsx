import * as React from 'react';
import { LOGIN_USER } from '../../mutations';
import { Mutation } from 'react-apollo';
import {
  LoginState,
  LoginProps,
  LoginData,
  LoginVariables
} from '../../interfaces/Login/login.interface';
import { isEmpty } from '../../utils/isEmpty';

import { Link, withRouter } from 'react-router-dom';

import ThemeWrapper from '../StyledComponents/MaterialUI/Theme';
import { TextField, Typography } from '@material-ui/core';
import { FormContainer } from '../StyledComponents/Form/FormContainer';
import { FormButton } from '../StyledComponents/Button/Button';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

class Login extends React.Component<LoginProps, LoginState> {
  public state: LoginState = {
    email: '',
    password: '',
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
    loginUser: any
  ) => {
    event.preventDefault();

    try {
      const data = await loginUser();
      localStorage.setItem('jwtToken', data.data.loginUser.token);
      await this.props.refetch();
      this.setState({ errors: {} });
      this.props.history.push('/');
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
    const { email, password } = this.state;
    return isEmpty(email || password);
  };

  public render() {
    const { email, password, errors } = this.state;

    return (
      <>
        <Mutation<LoginData, LoginVariables>
          mutation={LOGIN_USER}
          variables={{ email, password }}
        >
          {(loginUser, { loading }) => {
            return (
              <ComponentWrapper>
                <FormContainer
                  onSubmit={event => this.onSubmitHandler(event, loginUser)}
                >
                  <ThemeWrapper>
                    <Typography variant="display3">Recipe Book</Typography>
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
                        wide="true"
                        onClick={loginUser => this.onSubmitHandler}
                        disabled={this.validateForm()}
                        type="submit"
                      >
                        Login
                      </FormButton>
                      <Link to="/register">
                        <FormButton
                          variant="contained"
                          color="primary"
                          wide="true"
                        >
                          Or Register
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

export default withRouter(Login);
