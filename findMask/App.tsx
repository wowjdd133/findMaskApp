import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import MapPage from './pages/Map';
import StoreList from  './components/StoreList';
import {apolloClient} from './client';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default function App() {
  // const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Map" component={MapPage}/>
          <Stack.Screen name="List" component={StoreList}/>
        </Stack.Navigator>
      </NavigationContainer>
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
