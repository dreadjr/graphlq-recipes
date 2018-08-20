import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ThemeProvider from '../StyledComponents/MaterialUI/Theme';

import {
  RegisterLink,
  LoginLink,
  ProfileLink,
  AddRecipeLink,
  SearchLink
} from '../StyledComponents/Navigation/Navbar';

import Logout from '../Auth/Logout';

import { NavBarProps } from '../../interfaces/Navigation/navbar.interface';

import { withRouter } from 'react-router-dom';

const NavBar = (props: NavBarProps) => {
  const { session } = props;

  let authButtons;

  if (session && session.getCurrentUser) {
    authButtons = (
      <>
        <SearchLink to="/search">
          <Button color="inherit">Search</Button>
        </SearchLink>
        <AddRecipeLink to="/recipe/add">
          <Button color="inherit">Add Recipe</Button>
        </AddRecipeLink>
        <ProfileLink to="/profile">
          <Button color="inherit">Profile</Button>
        </ProfileLink>
        <Logout />
      </>
    );
  } else {
    authButtons = (
      <>
        <SearchLink to="/search">
          <Button color="inherit">Search</Button>
        </SearchLink>
        <RegisterLink to="/register">
          <Button color="inherit">Register</Button>
        </RegisterLink>
        <LoginLink to="/login">
          <Button color="inherit">Login</Button>
        </LoginLink>
      </>
    );
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <ThemeProvider>
        <AppBar
          position="static"
          style={{ backgroundColor: 'rgba(0, 121, 107, 0.8)' }}
        >
          <Toolbar style={{ width: '900px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '3.6rem',
                flex: 0.25
              }}
            >
              <Typography
                variant="title"
                color="inherit"
                style={{ fontSize: '1.3rem !important', cursor: 'pointer' }}
                onClick={() => props.history.push('/')}
              >
                React Recipes
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 0.75,
                justifyContent: 'flex-end'
              }}
            >
              {authButtons}
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default withRouter(NavBar);
