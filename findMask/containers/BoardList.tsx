import * as React from 'react';
import { Button, Alert, GestureResponderEvent } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardC from '../components/common/Card';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOARDS } from '../querys/Board';
import Loading from '../components/Loading';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import TextC from '../components/common/Text';
import ButtonC from '../components/common/Button';

interface BoardData {
  boards: {
    id: string;
    title: string;
    uid: {
      email: string;
      name: string;
    }
    create_at: Date;
    update_at: Date;
    viewCount: number;
  }[];
}

const Board = () => {
  //다시 돌아오면 업데이트 해야함.
  const navigation = useNavigation();
  const { data, loading, error, refetch, networkStatus } = useQuery<BoardData>(GET_BOARDS, {
    notifyOnNetworkStatusChange: true,
  });

  //다시 돌아오면 업데이트 함
  useFocusEffect(
    React.useCallback((): void => {
      refetch();
    }, [])
  );

  //refetch시에 실행.
  if (networkStatus === 4) {
    return (<Loading />);
  }

  if (loading) {
    return (<Loading />);
  }

  if (error) {
    Alert.alert("에러", error.message);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ButtonC
        backgroundColor="#eeeeee"
        color="#000000"
        onPress={(e) => {
          e.preventDefault();
          navigation.navigate('Login')
        }}
        title="누르면 로그인으로!"
      />
      <ButtonC
        backgroundColor="#eeeeee"
        color="#000000"
        onPress={(e) => {
          e.preventDefault();
          navigation.navigate('WriteBoard')
        }}
        title="누르면 글쓰기로!"
      />
      <CardC flex={1}>
        <FlatList
          style={{ backgroundColor: '#eeeeee', alignSelf: "stretch" }}
          keyExtractor={item => item.id}
          data={data!.boards}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={(event: GestureResponderEvent) => {
                  navigation.navigate("Board", {
                    id: item.id
                  });
                }}
                style={{ flex: 1 }}>
                <CardC borderBottom={1}
                  borderBottomColor="#ced4da">
                  <TextC fontSize={32}>{item.title}</TextC>
                  <TextC fontSize={16}>{item.viewCount}</TextC>
                  <TextC fontSize={16}>{item.uid.name}</TextC>
                  <TextC fontSize={16}>{item.create_at}</TextC>
                  <TextC fontSize={16}>{item.update_at}</TextC>
                </CardC>
              </TouchableOpacity>
            )
          }}
        />
      </CardC>
    </SafeAreaView>
  )
}

export default Board;