import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Avatar, Title, Caption, Drawer, Text } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GET_USER } from '../querys/User';
import { useQuery } from '@apollo/react-hooks';

const DrawerContent = (props) => {


  console.log(props);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View>
          {/* <View style={{ marginLeft: 20 }}>
            {
              isLogin ?
                <View style={{ flexDirection: "row" }}>
                  {data.user.user.image ?
                    <Avatar.Image
                      source={data.user.user.image}
                    />
                    :
                    <View style={{ width: 50, height: 50, backgroundColor: "red" }} />
                  }
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>{data.user.user.name}</Text>
                    <Text style={{ fontSize: 16 }}>{data.user.user.phoneNumber}</Text>
                  </View>
                </View>
                : <DrawerItem
                  icon={({ color, size }) =>
                    <Icon
                      name="clipboard"
                      color={color}
                      size={size}
                    />
                  }
                  onPress={() => { }}
                  label="로그인"
                />
            }
          </View> */}
          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) =>
                <Icon
                  name="clipboard"
                  color={color}
                  size={size}
                />
              }
              onPress={() => { }}
              label="게시판"
            />
            <DrawerItem
              icon={({ color, size }) =>
                <Icon
                  name="face-profile"
                  color={color}
                  size={size}
                />
              }
              onPress={() => {
                props.navigation.navigate('Profile')
              }}
              label="프로필"
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        {/* {
          isLogin && <DrawerItem
            icon={({ color, size }) =>
              <Icon
                name="exit-to-app"
                color={color}
                size={size}
              />}
            label="로그 아웃"
            onPress={() => {}}
          />
        } */}
      </Drawer.Section>
    </View>
  )
}

export default DrawerContent;