import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { Amplify } from 'aws-amplify';
// import { Container } from '@mui/material'
import awsExports from './aws-exports';
import { Authenticator, Input, Label } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Authenticated from './views/authenticated';

Amplify.configure({
  Auth: {
    region: awsExports.REGION,
    userPoolId: awsExports.USER_POOL_ID,
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
  }
});


const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#0073ed'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Authenticator initialState='signIn'
        components={{
          SignUp: {
            FormFields() {
              return (
                <>
                  <Authenticator.SignUp.FormFields />
                  <Label htmlFor="given_name">First Name</Label>
                  <Input id="given_name" name="given_name" />
                  <Label htmlFor="family_name">Last Name</Label>
                  <Input id="family_name" name="family_name" />
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" />
                </>
              );
            },
          },
        }}

        services={{
          async validateCustomSignUp(formData) {
            if (!formData.given_name) {
              return {
                given_name: 'First Name is required',
              };
            }
            if (!formData.family_name) {
              return {
                family_name: 'Last Name is required',
              };
            }
            if (!formData.email) {
              return {
                email: 'Email is required',
              };
            }
          },
        }}
      >
        {({ signOut, user }) => {
          return (
            <Authenticated signOut={signOut} />
          )
        }}
      </Authenticator>

    </ThemeProvider>

  );
}


export default App;