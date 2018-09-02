import * as React from 'react';
import UserInfo from './UserInfo';
import { ProfileProps } from '../../interfaces/Profile/profile.interface';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';
import { UserRecipes } from './UserRecipes';
import { withAuth } from '../withAuth';

const Profile = (props: ProfileProps) => {
  const { session } = props;

  return (
    <ComponentWrapper
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90vh',
        justifyContent: 'space-evenly'
      }}
    >
      <UserInfo session={session} />
      <UserRecipes username={session.getCurrentUser.username} />
    </ComponentWrapper>
  );
};

export default withAuth((session: any) => session && session.getCurrentUser)(
  Profile
) as any;
