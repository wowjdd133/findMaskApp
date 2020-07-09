import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import TopComponent from "../common/TopComponent"
import Close from '../../svgs/Close';
import ButtonC from "../common/Button";
import CardC from "../common/Card";
import TextC from "../common/Text";
import TextInputC from "../common/TextInput";
import { GestureResponderEvent } from "react-native";
import KeyboardAwareScrollViewComponent from '../common/KeyboardAwareScrollView';

interface RegisterProps {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  currentPassword: string;
  setName: any;
  setPhoneNumber: any;
  setPassword: any;
  setCurrentPassword: any;
  setEmail: any;
  handleGoBack: (e:GestureResponderEvent) => void;
  handleOnPress: (e:GestureResponderEvent) => Promise<void>
}

const Register = (props:RegisterProps) => {

  const {
    name,
    setName,
    currentPassword,
    handleGoBack,
    handleOnPress,
    password,
    phoneNumber,
    setCurrentPassword,
    setPassword,
    setPhoneNumber,
    email,
    setEmail
  } = props;

return (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#cccccc" }}>
    <KeyboardAwareScrollViewComponent>
      <TopComponent
        paddingLeft={30}
        onPress={handleGoBack}
      >
        <Close color="#000000" size={20} />
        <ButtonC
          backgroundColor="rgba(44,130,201,1)"
          color="#aaaaaa"
          onPress={handleOnPress}
          title="완료"
          width="30%"
        />
      </TopComponent>
      <CardC height="50px">
        <TextC fontSize={24}>
          회원가입
        </TextC>
      </CardC>

      <CardC flex={25} justifyContent="space-evenly">
        <TextInputC
          returnKeyType="next"
          marginTop={20}
          height="40px"
          placeholder="이메일"
          setValue={setEmail}
          value={email}
          keyboardType={"email-address"}
          maxLength={20}
        />
        <TextInputC
          marginTop={40}
          height="40px"
          placeholder="비밀번호"
          setValue={setPassword}
          value={password}
          isPassword={true}
          maxLength={20}
        />
         <TextInputC
          marginTop={40}
          height="40px"
          placeholder="비밀번호 재확인"
          setValue={setCurrentPassword}
          value={currentPassword}
          isPassword={true}
          maxLength={20}
        />
        <TextInputC
          marginTop={40}
          height="40px"
          placeholder="전화번호"
          setValue={setPhoneNumber}
          value={phoneNumber}
          keyboardType={"phone-pad"}
          maxLength={11}
        />
        <TextInputC
          marginTop={40}
          height="40px"
          placeholder="이름"
          setValue={setName}
          value={name}
          maxLength={12}
        />
      </CardC>
    </KeyboardAwareScrollViewComponent>
  </SafeAreaView>
)
}

export default Register;