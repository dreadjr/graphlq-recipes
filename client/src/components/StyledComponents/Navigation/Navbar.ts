import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavbarLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export const RegisterLink = NavbarLink.extend``;
export const LoginLink = NavbarLink.extend``;
export const LogoutLink = NavbarLink.extend``;
export const SearchLink = NavbarLink.extend``;
export const AddRecipeLink = NavbarLink.extend``;
export const ProfileLink = NavbarLink.extend``;

export const DashboardLink = NavbarLink.extend`
  flex: 1;
  margin-left: 1rem;
`;
