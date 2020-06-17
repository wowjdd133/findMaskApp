import React from 'react';
import { AppRegistry} from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import {apolloClient} from './client';
import Navigation from './containers/Navigation';
/*
    createMaterialTopTabNavigator = MaskStore map , list
    createBottomTabNavigator = Mask, Corona, Board, options?
    isAndroid? createDrawerNavigator : createbottomTabNavigator
*/

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Navigation/>
    </ApolloProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center'
//   }
// })

AppRegistry.registerComponent('App', () => App);
