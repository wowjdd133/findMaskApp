import * as React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { EDIT_PROFILE } from '../querys/User';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Platform, Alert, GestureResponderEvent } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import EditProfile from '../components/Profile/EditProfile';

type RouteStackParamList = {
  data: {
    data: {
      id: string;
      name: string;
      email: string;
      phoneNumber: string;
      image: string;
    }
  }
}

interface selectType {
  image: string | null;
}


type EditProfileRouteProps = RouteProp<RouteStackParamList, 'data'>

const EditProfileContainer = () => {

  const [editProfile, { data }] = useMutation(EDIT_PROFILE);

  const router = useRoute<EditProfileRouteProps>();
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState<selectType>({ image: router.params.data.image });

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

  const handlePickImage = (event: GestureResponderEvent) => {
    console.log(event);
    if (requestPermission()) {
      _pickImage();
    } else {
      Alert.alert("실패", "권한 허용을 해주세요");
    }
  }

  const handleEditProfile = async (e: GestureResponderEvent) => {
    e.preventDefault();
    try {
      await editProfile({
        variables: {
          id: router.params.data.id,
          name,
          email,
          phoneNumber,
          image: selected.image
        }
      })
      navigation.goBack();
    } catch (err) {
      Alert.alert("실패", err);
    }
  }

  return (
    <EditProfile
      name={name}
      email={email}
      phoneNumber={phoneNumber}
      selected={selected}
      setName={setName}
      setEmail={setEmail}
      setPhoneNumber={setPhoneNumber}
      setSelected={setSelected}
      handlePickImage={handlePickImage}
      handleEditProfile={handleEditProfile}
    />
  )
}

export default EditProfileContainer;