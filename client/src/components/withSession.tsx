import * as React from 'react';

import { Query } from 'react-apollo';

import { getCurrentUser } from '../queries';

export const withSession = (Component: any) => (props: any) => (
  <Query query={getCurrentUser}>
    {({ data, loading, refetch }) => {
      if (loading) {
        return null;
      }

      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);
