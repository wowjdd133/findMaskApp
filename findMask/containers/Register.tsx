import React, { useState } from 'react';
import Register from '../components/register';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER } from '../querys/User';
import { isEmail } from '../utils/loginUtil';
import { Alert, GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterContainer = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
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

  const handleGoBack = (e: GestureResponderEvent) => {
    navigation.goBack();
  }

  const handleOnPress = async (e: GestureResponderEvent) => {
    e.preventDefault();
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
  }

  return (
    <Register
      currentPassword={currentPassword}
      handleGoBack={handleGoBack}
      email={email}
      setEmail={setEmail}
      handleOnPress={handleOnPress}
      name={name}
      password={password}
      phoneNumber={phoneNumber}
      setCurrentPassword={setCurrentPassword}
      setName={setName}
      setPassword={setPassword}
      setPhoneNumber={setPhoneNumber}
    />
  )
}

export default RegisterContainer;