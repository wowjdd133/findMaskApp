import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardC from '../common/Card';
import TopComponent from '../common/TopComponent';
import Close from '../../svgs/Close';
import ButtonC from '../common/Button';
import TextC from '../common/Text';
import TextInputC from '../common/TextInput';
import { GestureResponderEvent } from 'react-native';

interface LoginProps {
  email: string;
  setEmail: any;
  password: string;
  setPassword: any;
  loginState: boolean;
  goBack: (e: GestureResponderEvent) => void;
  handleOnPress: (e: GestureResponderEvent) => void;
  handleLogin: (e: GestureResponderEvent) => void;
  handleChangeText: (text: string) => void;
}

const Login = (props: LoginProps) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginState,
    goBack,
    handleOnPress,
    handleLogin,
    handleChangeText,
  } = props;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <TopComponent
          paddingLeft={30}
          onPress={goBack}
        >
          <Close color="#000000" size={20} />
          <ButtonC
            onPress={handleLogin}
            backgroundColor="blue"
            color="gray"
            title="로그인"
            width="30%"
          />
        </TopComponent>
        <CardC flex={5} justifyContent="space-around">
          <TextC fontSize={30} marginTop={30}>
            Find Mask App
          </TextC>
          <TextInputC
            keyboardType="email-address"
            maxLength={25}
            height="45px"
            setValue={setEmail}
            value={email}
            placeholder="Email"
          />
          <TextInputC
            height="45px"
            maxLength={15}
            setValue={setPassword}
            value={password}
            onChangeText={handleChangeText}
            placeholder="Password"
            isPassword={true}
          />
          <ButtonC
            around
            backgroundColor="rgba(44,130,201,1)"
            color="#FFFFFF"
            onPress={handleOnPress}
            title="아이디가 없으신가요?"
          />
          <ButtonC
            around
            backgroundColor="rgba(44,130,201,1)"
            color="#FFFFFF"
            onPress={handleLogin}
            title="로그인"
            width="90%"
            disabled={loginState}
          />
        </CardC>
    </SafeAreaView>
  )
}

export default Login;