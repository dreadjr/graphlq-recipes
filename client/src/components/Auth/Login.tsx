import * as React from 'react';
import Input from '../Input/Input';

import { LOGIN_USER } from '../../mutations';

import { Mutation } from 'react-apollo';

import { LoginState } from '../../interfaces/Login/login.interface';

import { isEmpty } from '../../utils/isEmpty';

import { History } from 'history';

interface LoginProps {
  history?: History;
  refetch: any;
}

export default class Login extends React.Component<LoginProps, LoginState> {
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

  public onSubmitHandler = (
    event: React.FormEvent<HTMLFormElement>,
    loginUser: any
  ) => {
    event.preventDefault();
    loginUser()
      .then(async ({ data }: any) => {
        localStorage.setItem('jwtToken', data.loginUser.token);
        await this.props.refetch();
        this.setState({ errors: {} });
        this.props.history!.push('/');
      })
      .catch((error: any) => {
        const {
          graphQLErrors: [
            {
              extensions: { exception: errors }
            }
          ]
        } = error;

        this.setState({ errors });
      });
  };

  public validateForm = () => {
    const { email, password } = this.state;
    return isEmpty(email || password);
  };

  public render() {
    const { email, password, errors } = this.state;

    return (
      <div>
        <h2>Login</h2>
        <Mutation mutation={LOGIN_USER} variables={{ email, password }}>
          {(loginUser, { loading }) => {
            return (
              <form onSubmit={event => this.onSubmitHandler(event, loginUser)}>
                <Input
                  placeholder={'Email'}
                  value={email}
                  name="email"
                  onChange={this.onChangeHandler}
                />
                <Input
                  placeholder={'Password'}
                  value={password}
                  name="password"
                  onChange={this.onChangeHandler}
                  type="password"
                />
                <button type="submit" disabled={loading || this.validateForm()}>
                  Submit
                </button>
              </form>
            );
          }}
        </Mutation>
        {errors ? (
          <>
            <div>{errors.email}</div>
            <div>{errors.username}</div>
            <div>{errors.password}</div>
            <div>{errors.confirmPassword}</div>
          </>
        ) : null}
      </div>
    );
  }
}
