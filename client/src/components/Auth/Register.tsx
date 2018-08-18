import * as React from 'react';
import Input from '../Input/Input';
import { REGISTER_USER } from '../../mutations';
import { Mutation } from 'react-apollo';
import {
  RegisterState,
  RegisterProps
} from '../../interfaces/Register/register.interface';
import { isEmpty } from '../../utils/isEmpty';

export default class Register extends React.Component<
  RegisterProps,
  RegisterState
> {
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
      this.props.history!.push('/login');
      this.setState({ errors: {} });
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
      <div>
        <h2>Register</h2>
        <Mutation
          mutation={REGISTER_USER}
          variables={{ email, username, password, confirmPassword }}
        >
          {(registerUser, { loading }) => {
            return (
              <form
                onSubmit={event => this.onSubmitHandler(event, registerUser)}
              >
                <Input
                  placeholder={'Email'}
                  value={email}
                  name="email"
                  onChange={this.onChangeHandler}
                />
                <Input
                  placeholder={'Username'}
                  value={username}
                  name="username"
                  onChange={this.onChangeHandler}
                />
                <Input
                  placeholder={'Password'}
                  value={password}
                  name="password"
                  onChange={this.onChangeHandler}
                  type="password"
                />
                <Input
                  placeholder={'Confirm Password'}
                  value={confirmPassword}
                  name="confirmPassword"
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
