import * as React from 'react';
import {View, Text, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

//뒤로가기 헤더에 놔두기
const Login = () => {

  const navigation = useNavigation();

  return(
    <View>
      <Text>
        이곳은 로그인이여
      </Text>
      <Button
        onPress={() => {
          navigation.navigate('Register')
        }}
        title="이곳은 회원가입이여"
      />
      <Button
        onPress={() => {
          navigation.goBack()
        }}
        title="이곳은 뒤로가기여"
      />
    </View>
  )
}

export default Login;