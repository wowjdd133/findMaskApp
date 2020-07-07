import * as React from 'react';
import CardC from '../components/common/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image, GestureResponderEvent } from 'react-native';
import { GET_USER } from '../querys/User';
import TextC from '../components/common/Text';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import ButtonC from '../components/common/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Profile from '../components/Profile/Profile';

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

  if (networkStatus === 4) {
    return <Loading />
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.warn(error);
    return <TextC fontSize={16}>에러가 났어요</TextC>
  }

  if (data) {
    return (
      <Profile
        handleOnPress={handleOnPress}
        user={data.user}
      />
    )
  }

  return (
    <TextC fontSize={16}>널 처리</TextC>
  )
}

export default ProfileContainer;