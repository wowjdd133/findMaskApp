import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {screens} from '../screens';
import {Icons} from '../svgs';
import { NavigationContainer } from '@react-navigation/native';

const Navigation = () => {
  const Stack = createStackNavigator();
  const TopTab = createMaterialTopTabNavigator();
  const BottomTab = createBottomTabNavigator();

  const MaskStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Map" component={screens.MapScreen}/>
        <Stack.Screen name="List" component={screens.StoreListScreen}/>
      </Stack.Navigator>
    )
  }
  
  return (
    <NavigationContainer>
      <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: '#cecece' },
      }}>
        <BottomTab.Screen 
          name="Mask" 
          component={MaskStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icons.MaskIcon color={color} size={24}/>
            ) 
            }
          }/>
        <BottomTab.Screen 
          name="Korea" 
          component={screens.KoreaCoronaScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icons.KoreaIcon color={color} size={24}/>
            ) 
            }
          }/>
        <BottomTab.Screen 
          name="World" 
          component={screens.WorldCoronaScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icons.WorldIcon color={color} size={24}/>
            ) 
            }
          }/>
        <BottomTab.Screen
          name="Board" 
          component={screens.BoardScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icons.BoardIcon color={color} size={24}/>
            ) 
            }
          }/> 
        <BottomTab.Screen 
          name="Profile" 
          component={screens.ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icons.ProfileIcon color={color} size={24}/>
            ) 
            }
          }/>
      </BottomTab.Navigator>
  </NavigationContainer>
  )
}

export default Navigation;