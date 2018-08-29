import * as React from 'react';
import UserInfo from './UserInfo';
import { ProfileProps } from '../../interfaces/Profile/profile.interface';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

export const Profile = (props: ProfileProps) => (
  <ComponentWrapper>
    <UserInfo session={props.session} />
  </ComponentWrapper>
);
