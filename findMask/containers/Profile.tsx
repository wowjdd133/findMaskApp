import * as React from 'react';
import { GestureResponderEvent, Alert,Text } from 'react-native';
import { GET_USER } from '../querys/User';
import TextC from '../components/common/Text';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Profile from '../components/Profile/Profile';
import { SafeAreaView } from 'react-native-safe-area-context';

interface userData {
  user: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    create_at: Date;
    permission: string;
    image: string;
  }
}

const ProfileContainer = () => {

  const navigation = useNavigation();
  const { data, loading, error,refetch,networkStatus } = useQuery<userData>(GET_USER,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy:'network-only'
    });

  useFocusEffect(
    React.useCallback(() => {
        try{
          refetch();
        }catch(err){
        }
    },[])
  );

  const handleOnPress = (e:GestureResponderEvent) => {
    e.preventDefault();
    navigation.navigate('EditProfile', {
      data: {
        id: data!.user.id,
        email: data!.user.email,
        phoneNumber: data!.user.phoneNumber,
        name: data!.user.name,
        image: data!.user.image
      }
    });
  }

  console.log(data);

  if(networkStatus === 4) {
    return <Loading />
  }

  if(loading) {
    return <Loading />
  }

  if(error) {
    Alert.alert("로그인을 해주세요")
    return (
      <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>로그인을 해주세요.</Text>
      </SafeAreaView>
    )
  }

  if(data && data.user) {
    return (
      <Profile
        handleOnPress={handleOnPress}
        user={data.user}
      />
    )
  }

  Alert.alert("로그인을 다시해주세요.")

  return (
    <SafeAreaView style={{flex:1, justifyContent:'center'}}>
      <Text>유저를 찾을 수 없습니다!</Text>
    </SafeAreaView>
  )
}

export default ProfileContainer;