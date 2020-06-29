import React, { useState } from 'react';
import { GestureResponderEvent, Alert, AsyncStorage, ToastAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../querys/User';
import Card from '../components/common/Card';
import Text from '../components/common/Text';
import TextInput from '../components/common/TextInput';
import Button from '../components/common/Button';
import Close from '../svgs/Close';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isEmail } from '../utils/loginUtil';

//뒤로가기 헤더에 놔두기
const Login = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState(true);
  const [login, { data }] = useMutation(LOGIN);

  console.log(data);
  if (data) {
    AsyncStorage.setItem('token', data.login);

    if (Platform.OS === 'android') {
      ToastAndroid.show("로그인 성공", ToastAndroid.SHORT);
    }
    navigation.navigate('BoardList');
  }

  const goBack = (e: GestureResponderEvent) => {
    e.preventDefault();
    navigation.navigate('Board');
  }

  const handleLogin = async (e: GestureResponderEvent) => {
    e.preventDefault();
    if (email.length <= 10) {
      Alert.alert("로그인 실패", "이메일을 확인해주세요");
      return;
    }
    else if (!isEmail(email)) {
      Alert.alert("로그인 실패", "이메일 형식을 확인해주세요");
      return;
    }
    else if (password.length <= 8) {
      Alert.alert("로그인 실패", "패스워드를 확인해주세요")
      return;
    }
    try {
      await login({ variables: { email: email, password: password } });
    } catch (err) {
      Alert.alert("로그인 실패", "아이디나 비밀번호가 맞지 않습니다.")
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Card radius={25}>
        <Card row={true} justifyContent="space-around" align="center">
          <Card align="flex-start"
            paddingLeft={30}
            onPress={goBack}
            touchable
          >
            <Close color="#000000" size={20} />
          </Card>
        </Card>
        <Card flex={5} justifyContent="space-around">
          <Text fontSize={30} marginTop={30}>
            Find Mask App
          </Text>
          <TextInput
            keyboardType="email-address"
            maxLength={25}
            height="45px"
            setValue={setEmail}
            value={email}
            placeholder="Email"
          />
          <TextInput
            height="45px"
            maxLength={15}
            setValue={setPassword}
            value={password}
            onChangeText={(text: string) => {
              if (text.length <= 7) {
                setLoginState(true);
              } else {
                setLoginState(false);
              }
              setPassword(text);
            }}
            placeholder="Password"
            isPassword={true}
          />
          <Button
            onPress={() => {
              navigation.navigate('Register')
            }}
            title="아이디가 없으신가요?"
            color="rgba(44,130,201,1)"
          />
          <Button
            onPress={handleLogin}
            title="로그인"
            color="rgba(44,130,201,1)"
            width="90%"
            disabled={loginState}
          />
        </Card>
      </Card>
    </SafeAreaView>
  )
}

export default Login;