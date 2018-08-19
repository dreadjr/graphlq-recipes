import * as React from 'react';

import { Query } from 'react-apollo';

import { getCurrentUser } from '../queries';

interface GetCurrentUserData {
  username: string;
  email: string;
  joinDate: string;
}

export const withSession = (Component: any) => (props: any) => (
  <Query<GetCurrentUserData, {}> query={getCurrentUser}>
    {({ data, loading, refetch }) => {
      if (loading || !data) {
        return null;
      }

      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);
