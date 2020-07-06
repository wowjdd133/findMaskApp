import * as React from 'react';
import CardC from '../components/common/Card';
import TextC from '../components/common/Text';
import { useMutation } from '@apollo/react-hooks';
import { EDIT_PROFILE } from '../querys/User';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { View, Platform, Image, Alert } from 'react-native';
import ButtonC from '../components/common/Button';
import TextInputC from '../components/common/TextInput';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

type RouteStackParamList = {
  data: {
    data: {
      id: string;
      name: string;
      email: string;
      phoneNumber: string;
      setIsEdit: any;
    }
  }
}

interface selectType {
  image: string | null;
}


type EditProfileRouteProps = RouteProp<RouteStackParamList, 'data'>

const EditProfile = () => {

  const [editProfile, { data }] = useMutation(EDIT_PROFILE);

  const router = useRoute<EditProfileRouteProps>();
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState<selectType>({ image: null });

  const [name, setName] = React.useState(router.params.data.name);
  const [email, setEmail] = React.useState(router.params.data.email)
  const [phoneNumber, setPhoneNumber] = React.useState(router.params.data.phoneNumber)

  //writeBoard 꺼임.
  const requestPermission = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      return status === 'granted';
    }

    return true;
  }

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!result.cancelled) {
        setSelected({ image: result.uri });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CardC flex={1}>
        <CardC flex={1} backgroundColor="gray">
          {
            selected.image ?
              <TouchableOpacity
                onPress={() => {
                  if (requestPermission()) {
                    _pickImage();
                  } else {
                    Alert.alert("실패", "권한 허용을 해주세요");
                  }
                }}
                style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: 'white' }}
              >
                <Image
                  source={{ uri: selected.image! }}
                  style={{ width: 150, height: 150, borderRadius: 75, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
              : <TouchableOpacity
                onPress={() => {
                  if (requestPermission()) {
                    _pickImage();
                  } else {
                    Alert.alert("실패", "권한 허용을 해주세요");
                  }
                }}
                style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: 'white' }}
              />
          }

        </CardC>
        <CardC flex={2} justifyContent="space-evenly">
          <TextInputC
            placeholder="이름"
            value={name}
            setValue={setName}
          ></TextInputC>
          <TextInputC
            placeholder="이메일"
            value={email}
            setValue={setEmail}
          ></TextInputC>
          <TextInputC
            placeholder="폰번호"
            value={phoneNumber}
            setValue={setPhoneNumber}
          ></TextInputC>
          <ButtonC
            backgroundColor="#eeeeee"
            onPress={async () => {
              await editProfile({
                variables: {
                  id: router.params.data.id,
                  name,
                  email,
                  phoneNumber,
                  image: selected.image
                }
              })
              await router.params.data.setIsEdit(true);

              navigation.goBack();
            }}
            title="수정 완료"
            color="#ffffff"
          />
        </CardC>
      </CardC>
    </SafeAreaView>
  )
}

export default EditProfile;