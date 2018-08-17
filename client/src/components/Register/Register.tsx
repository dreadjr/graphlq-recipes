// import * as React from 'react';

// import Input from '../Input/Input';

// import { graphql } from 'react-apollo';

// import {
//   RegisterProps,
//   RegisterState
// } from '../../interfaces/Register/register.interface';

// import { registerMutation } from '../../mutations';

// class Register extends React.Component<RegisterProps, RegisterState> {
//   public state: RegisterState = {
//     username: '',
//     email: '',
//     password: '',
//     errors: {}
//   };

//   public onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.currentTarget;
//     this.setState({
//       ...this.state,
//       [name]: value
//     });
//   };

//   public onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const { username, email, password } = this.state;

//     try {
//       await this.props.mutate({
//         variables: {
//           username,
//           email,
//           password
//         }
//       });

//       this.setState({ errors: {} });
//     } catch (error) {
//       const {
//         graphQLErrors: [
//           {
//             extensions: { exception: errors }
//           }
//         ]
//       } = error;

//       this.setState({ errors });
//     }
//   };

//   public render() {
//     const { username, email, password, errors } = this.state;

//     return (
//       <div>
//         <form onSubmit={this.onSubmitHandler}>
//           <Input
//             placeholder={'Email'}
//             value={email}
//             name="email"
//             onChange={this.onChangeHandler}
//           />
//           <Input
//             placeholder={'Username'}
//             value={username}
//             name="username"
//             onChange={this.onChangeHandler}
//           />
//           <Input
//             placeholder={'Password'}
//             value={password}
//             name="password"
//             onChange={this.onChangeHandler}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         {errors ? (
//           <>
//             <div>{errors.email}</div>
//             <div>{errors.username}</div>
//             <div>{errors.password}</div>
//           </>
//         ) : null}
//       </div>
//     );
//   }
// }

// export default graphql(registerMutation)(Register);
