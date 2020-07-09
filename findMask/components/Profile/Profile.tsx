import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardC from '../common/Card';
import TextC from '../common/Text';
import ButtonC from '../common/Button';
import { Image, GestureResponderEvent, View } from 'react-native';

//profile userData
interface ProfileProp {
  user:{
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    create_at: Date;
    permission: string;
    image?: string;
  };
  handleOnPress: (e:GestureResponderEvent) => void;
}

const Profile = ({user,handleOnPress}:ProfileProp) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CardC flex={1}>
        <CardC flex={1} backgroundColor="#eeeeee">
          {user.image !== null ? <Image
            source={{uri:user.image}}
            style={{ width: 150, height: 150, borderRadius: 75, resizeMode:'cover'}}
          />:<View
          style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: 'blue' }}
        />}
        </CardC>
        <CardC flex={2} justifyContent="space-evenly">
          <TextC fontSize={16}>이름: {user.name}</TextC>
          <TextC fontSize={16}>이메일: {user.email}</TextC>
          <TextC fontSize={16}>전화번호: {user.phoneNumber}</TextC>
          <ButtonC
            backgroundColor="#eeeeee"
            onPress={handleOnPress}
            title="수정하기"
            color="#ffffff"
          />
        </CardC>
      </CardC>
    </SafeAreaView>
  )
};

export default Profile;