import React from 'react';
import { GestureResponderEvent, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardC from '../common/Card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputC from '../common/TextInput';
import ButtonC from '../common/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardAwareScrollViewComponent from '../common/KeyboardAwareScrollView';

interface EditProfileProp {
  name: string;
  email: string;
  phoneNumber: string;
  selected: {
    image: string | null;
  };
  setName: any;
  setEmail: any;
  setPhoneNumber: any;
  setSelected: any;
  handlePickImage: (event: GestureResponderEvent) => void;
  handleEditProfile: (event: GestureResponderEvent) => Promise<void>;
}

const EditProfile = (props: EditProfileProp) => {
  const {
    name,
    email,
    phoneNumber,
    selected,
    setName,
    setEmail,
    setPhoneNumber,
    handlePickImage,
    handleEditProfile
  } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollViewComponent>
        <CardC flex={0.5}>
          <CardC flex={1} backgroundColor="gray">
            {
              selected.image ?
                <TouchableOpacity
                  onPress={handlePickImage}
                  style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: 'white' }}
                >
                  <Image
                    source={{ uri: selected.image! }}
                    style={{ width: 150, height: 150, borderRadius: 75, resizeMode: 'cover' }}
                  />
                </TouchableOpacity>
                : <TouchableOpacity
                  onPress={handlePickImage}
                  style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: 'white' }}
                />
            }

          </CardC>
        </CardC>
        <CardC flex={8} justifyContent="space-evenly">
          <TextInputC
            marginTop={40}
            placeholder="이름"
            maxLength={12}
            value={name}
            setValue={setName}
          ></TextInputC>
          <TextInputC
            marginTop={48}
            placeholder="이메일"
            value={email}
            maxLength={20}
            setValue={setEmail}
          ></TextInputC>
          <TextInputC
            placeholder="폰번호"
            marginTop={48}
            maxLength={11}
            value={phoneNumber}
            setValue={setPhoneNumber}
          ></TextInputC>
          <ButtonC
            marginTop={48}
            backgroundColor="#eeeeee"
            onPress={handleEditProfile}
            title="수정 완료"
            color="#ffffff"
          />
        </CardC>
      </KeyboardAwareScrollViewComponent>
    </SafeAreaView>
  )
}

export default EditProfile;