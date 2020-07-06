import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { screens } from '../screens';
import { Icons } from '../svgs';
import { NavigationContainer } from '@react-navigation/native';

const Navigation = () => {
  const Stack = createStackNavigator();
  // const TopTab = createMaterialTopTabNavigator();
  const Drawer = createDrawerNavigator();
  const BottomTab = createBottomTabNavigator();

  const MaskStack = () => {
    return (
      <Stack.Navigator
        headerMode="none">
        <Stack.Screen name="Map" component={screens.MapScreen} />
        <Stack.Screen name="List" component={screens.StoreListScreen} />
      </Stack.Navigator>
    )
  }

  const LoginStack = () => {
    return (
      <Stack.Navigator
        headerMode="none">
        <Stack.Screen name="Login" component={screens.LoginScreen} />
        <Stack.Screen name="Register" component={screens.RegisterScreen} />
      </Stack.Navigator>
    )
  }

  const BoardStack = () => {
    return (
      <Stack.Navigator
        headerMode="none">
        <Stack.Screen name="BoardList" component={screens.BoardListScreen} />
        <Stack.Screen name="WriteBoard" component={screens.WriteBoardScreen} />
        <Stack.Screen name="Board" component={screens.BoardScreen} />
      </Stack.Navigator>
    )
  }

  const ProfileStack = () => {
    return (
      <Stack.Navigator
        headerMode="none"
      >
        <Stack.Screen name="Profile" component={screens.ProfileScreen}/>
        <Stack.Screen name="EditProfile" component={screens.EditProfileScreen}/>
      </Stack.Navigator>
    )
  }

  //board 장르 같은 것도 만들어야할듯?
  const BoardDrawer = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Board" component={BoardStack} />
        <Drawer.Screen name="Login" component={LoginStack} />
      </Drawer.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <BottomTab.Navigator
        tabBarOptions={{
          activeTintColor: '#FFFFFF',
          labelStyle: { fontSize: 12 },
          style: { 
            backgroundColor: '#cecece',
            height: 50,
          },
        }}>
        <BottomTab.Screen
          name="Mask"
          component={MaskStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.MaskIcon color={color} size={24} />
            )
          }
          } />
        <BottomTab.Screen
          name="Korea"
          component={screens.KoreaCoronaScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.KoreaIcon color={color} size={24} />
            )
          }
          } />
        <BottomTab.Screen
          name="World"
          component={screens.WorldCoronaScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.WorldIcon color={color} size={24} />
            )
          }
          } />
        <BottomTab.Screen
          name="Board"
          component={BoardDrawer}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.BoardIcon color={color} size={24} />
            )
          }
          } />
        <BottomTab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icons.ProfileIcon color={color} size={24} />
            )
          }
          } />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;