import React, { useState } from 'react';
import Card from '../components/common/Card'
import Text from '../components/common/Text'
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInput from '../components/common/TextInput';
import Button from '../components/common/Button';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER } from '../querys/User';
import { isEmail } from '../utils/loginUtil';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Close from '../svgs/Close';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setcurrentPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [register, { data }] = useMutation(REGISTER);
  const navigation = useNavigation();

  if (data) {
    if (data.register) {
      Alert.alert("회원가입 성공");
      navigation.navigate("Login")
    }
  }

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Card align="flex-start"
          paddingLeft={30}
          onPress={goBack}
          touchable
        >
          <Close color="#000000" size={20} />
        </Card>
        <Card flex={10} justifyContent="space-around">
          <Text fontSize={24}>
            회원가입
          </Text>
          <TextInput
            height="40px"
            placeholder="이메일"
            marginTop={30}
            setValue={setEmail}
            value={email}
            keyboardType={"email-address"}
            maxLength={20}
          />
          <TextInput
            height="40px"
            placeholder="비밀번호"
            marginTop={30}
            setValue={setPassword}
            value={password}
            isPassword={true}
            maxLength={20}
          />
          <TextInput
            height="40px"
            placeholder="비밀번호 재확인"
            marginTop={30}
            setValue={setcurrentPassword}
            value={currentPassword}
            isPassword={true}
            maxLength={20}
          />
          <TextInput
            height="40px"
            placeholder="전화번호"
            marginTop={30}
            setValue={setPhoneNumber}
            value={phoneNumber}
            keyboardType={"phone-pad"}
            maxLength={11}
          />
          <TextInput
            height="40px"
            placeholder="이름"
            marginTop={30}
            setValue={setName}
            value={name}
            maxLength={12}
          />

          <Button
            backgroundColor="rgba(44,130,201,1)"
            color="#FFFFFF"
            onPress={async () => {
              if (!isEmail(email)) {
                Alert.alert("회원가입 실패", "이메일 확인.");
                return;
              } else if (phoneNumber.length < 11) {
                Alert.alert("회원가입 실패", "휴대폰 확인. -를 제외한 숫자입니다.")
                return;
              } else if (password.length <= 8) {
                Alert.alert("회원가입 실패", "비밀번호는 8자리를 넘겨주세요");
                return;
              } else if (password !== currentPassword) {
                Alert.alert("회원가입 실패", "비밀번호가 일치하지 않습니다.");
                return;
              } else if (!name) {
                Alert.alert("회원가입 실패", "이름을 확인해주세요.");
                return;
              }

              try {
                await register({
                  variables: {
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                    name: name
                  }
                })
              } catch (err) {
                console.log(err);
              }
            }}
            title="회원가입"
            marginTop={30}
            width="90%"
          />
        </Card>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Register;