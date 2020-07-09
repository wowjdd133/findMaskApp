import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardC from './common/Card';

interface ListItemProp {
  onPress: (e: GestureResponderEvent) => void;
  children: React.ReactNode;
}

const ListItem = ({onPress, children}: ListItemProp) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex:1, alignSelf: 'stretch' }}
    >
      <CardC 
        row
        borderBottom={1}
        borderBottomColor="#ced4da">
        {children}
      </CardC>
    </TouchableOpacity>
  )
}

export default ListItem;