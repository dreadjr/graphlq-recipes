import * as React from 'react';
import { Query } from 'react-apollo';
import { getCurrentUser } from '../queries';
import { Redirect } from 'react-router-dom';

export const withAuth = (conditionFunc: any) => (Component: any) => (
  props: any
) => (
  <Query query={getCurrentUser}>
    {({ data, loading }) => {
      if (loading || !data) {
        return null;
      }

      return conditionFunc(data) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      );
    }}
  </Query>
);
