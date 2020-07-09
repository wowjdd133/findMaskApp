import React, { useState } from 'react';
import { GestureResponderEvent, Alert, AsyncStorage, ToastAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../querys/User';
import { isEmail } from '../utils/loginUtil';
import Login from '../components/login';

//뒤로가기 헤더에 놔두기
const LoginContainer = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState(true);
  const [login, { data }] = useMutation(LOGIN);

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

  const handleOnPress = (e: GestureResponderEvent) => {
    e.preventDefault();
    navigation.navigate('Register')
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

  const handleChangeText = (text: string) => {
    if (text.length <= 7) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
    setPassword(text);
  };

  return (
    <Login
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      loginState={loginState}
      goBack={goBack}
      handleOnPress={handleOnPress}
      handleLogin={handleLogin}
      handleChangeText={handleChangeText}
    />
  )
}

export default LoginContainer;