import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from 'react-dom';

const generateUri = () => {
  return process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:3000/graphql';
};

const client = new ApolloClient({
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
