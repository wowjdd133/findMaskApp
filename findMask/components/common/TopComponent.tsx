import React from 'react';
import CardC from './Card';
import { GestureResponderEvent } from 'react-native';

interface TopComponentProps {
  children: React.ReactNode;
  onPress: (e:GestureResponderEvent) => void;
  paddingLeft?: number;
}

const TopComponent = (props:TopComponentProps) => {
  return(
    <CardC height="100px" row align="center" justifyContent="space-between" onPress={props.onPress} touchable
      paddingLeft={props.paddingLeft}
    >
      {props.children}
    </CardC>
  )
}

export default TopComponent;