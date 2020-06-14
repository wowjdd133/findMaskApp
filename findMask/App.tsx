import React from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import Map from './components/Map';
import client from './client';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Map/>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent('Map', () => App);
