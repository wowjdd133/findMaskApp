import * as React from 'react';
import {View, Text, Button} from 'react-native';

import { useNavigation } from '@react-navigation/native';
const Board = () => {
  const navigation = useNavigation();
  
  return(
    <View>
      <Button
        onPress={(e) => {
          e.preventDefault();
          navigation.navigate('Board')
        }}
        title="누르면 보드로!"
      />
      <Button
        onPress={(e) => {
          e.preventDefault();
          navigation.navigate('Login')
        }}
        title="누르면 로그인으로!"
      />
      <Button
        onPress={(e) => {
          e.preventDefault();
          navigation.navigate('WriteBoard')
        }}
        title="누르면 글쓰기로!"
      />
    </View>
  )
}

export default Board;