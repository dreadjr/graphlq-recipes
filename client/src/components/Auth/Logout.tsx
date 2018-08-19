import * as React from 'react';

import { withRouter, RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import { Button } from '@material-ui/core';

import { ApolloConsumer } from 'react-apollo';

const onLogoutHandler = (client: any, history: History) => {
  localStorage.setItem('jwtToken', '');
  client.resetStore();
  history.push('/');
};

const Logout = (props: RouteComponentProps<any>) => (
  <ApolloConsumer>
    {client => {
      return (
        <Button
          color="inherit"
          onClick={() => onLogoutHandler(client, props.history)}
        >
          Logout
        </Button>
      );
    }}
  </ApolloConsumer>
);

export default withRouter(Logout);
