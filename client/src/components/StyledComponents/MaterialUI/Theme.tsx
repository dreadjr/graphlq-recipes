import * as React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      root: {
        fontSize: '2rem'
      },
      underline: {
        '&:after': {
          // underline color when textfield is inactive
          borderBottom: '2px solid rgba(0, 121, 107, 0.8)'
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: '2px solid rgba(0, 121, 107, 0.8)'
        }
      }
    },
    MuiFormLabel: {
      root: {
        fontSize: '1.7rem',
        '&$focused': {
          color: 'rgba(0, 121, 107, 0.8)'
        }
      }
    },
    MuiFormControl: {
      root: {
        width: '30rem'
      }
    },
    MuiButton: {
      root: {
        fontSize: '1.3rem'
      },
      containedPrimary: {
        width: '30rem',
        marginTop: '1.2rem',
        fontSize: '1.7rem',
        backgroundColor: 'rgba(0, 121, 107, 0.8)',
        '&:hover': {
          backgroundColor: 'rgba(0, 101, 107, 0.8)'
        }
      },
      containedSecondary: {
        width: '30rem',
        marginTop: '1.2rem',
        fontSize: '1.7rem'
        // backgroundColor: 'rgba(0, 121, 107, 0.8)',
        // '&:hover': {
        //   backgroundColor: 'rgba(0, 101, 107, 0.8)'
        // }
      }
    },
    MuiTypography: {
      display3: {
        fontSize: '5.5rem'
      }
    },
    MuiModal: {
      root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
});

interface ThemeWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export default (props: ThemeWrapperProps) => (
  <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
);
