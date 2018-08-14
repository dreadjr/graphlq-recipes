import * as React from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home/Home';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

export default class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Route exact={true} path="/" component={Home} />
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
