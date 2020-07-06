import * as React from 'react';
import CardC from '../components/common/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Image } from 'react-native';
import { GET_USER } from '../querys/User';
import TextC from '../components/common/Text';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import ButtonC from '../components/common/Button';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

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
  const { data, loading, error, refetch, networkStatus } = useQuery<userData>(GET_USER,
    {
      notifyOnNetworkStatusChange: true
    });
  const [isEdit, setIsEdit] = React.useState(false);

  React.useEffect(() => {
    if (isEdit) {
      setIsEdit(false);
      refetch();
    }
  },[]);

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
    
  console.log(data.user.image);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CardC flex={1}>
          <CardC flex={1} backgroundColor="gray">
            {data.user.image ? <Image
              source={{uri:data.user.image}}
              style={{ width: 150, height: 150, borderRadius: 75, resizeMode:'contain', backgroundColor:'red'}}
            />:<View
            style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: 'blue' }}
          />}
          </CardC>
          <CardC flex={2} justifyContent="space-evenly">
            <TextC fontSize={16}>이름: {data.user.name}</TextC>
            <TextC fontSize={16}>이메일: {data.user.email}</TextC>
            <TextC fontSize={16}>전화번호: {data.user.phoneNumber}</TextC>
            <ButtonC
              backgroundColor="#eeeeee"
              onPress={() => {
                navigation.navigate('EditProfile', {
                  data: {
                    id: data.user.id,
                    email: data.user.email,
                    phoneNumber: data.user.phoneNumber,
                    name: data.user.name,
                    setIsEdit: setIsEdit,
                    image: data.user.image
                  }
                });
              }}
              title="수정하기"
              color="#ffffff"
            />
          </CardC>
        </CardC>
      </SafeAreaView>
    )
  }

  return (
    <TextC fontSize={16}>널 처리</TextC>
  )
}

export default ProfileContainer;