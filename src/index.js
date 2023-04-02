import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, split, HttpLink, InMemoryCache} from '@apollo/client';
import { render } from 'react-dom';
import {  WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloProvider  } from '@apollo/react-hooks';

const generateUri = () => {
  return process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:3000/graphql';
};

const httpLink = new HttpLink({ 
  uri: 'http://localhost:3000/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/graphql',
  options: {
    reconnect: true
  }
});

const splitLink = split( ( { query } ) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  );
}, wsLink,
httpLink);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  uri: generateUri(),
  credentials: 'include',
});

const ApolloApp = (AppComponent) => (
  <ApolloProvider client={client}>
    <React.StrictMode>
      <AppComponent />
    </React.StrictMode>
  </ApolloProvider>
);

render(ApolloApp(App), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
