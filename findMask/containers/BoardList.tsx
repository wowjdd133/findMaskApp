import * as React from 'react';
import { Button, Alert, GestureResponderEvent, AsyncStorage } from 'react-native';
import { useFocusEffect, DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardC from '../components/common/Card';
import { useQuery } from '@apollo/react-hooks';
import { GET_BOARDS } from '../querys/Board';
import Loading from '../components/Loading';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import TextC from '../components/common/Text';
import ButtonC from '../components/common/Button';
import ListItem from '../components/ListItem';
import { getElaspedTime } from '../utils/MaskUtil';
import BoardList from '../components/board/BoardList';
import { isLogin } from '../utils/loginUtil';

interface BoardsData {
  boards: Board[];
}

export interface Board {
  id: string;
  title: string;
  uid: {
    email: string;
    name: string;
  }
  create_at: Date;
  update_at: Date;
  viewCount: number;
}

const BoardListContainer = () => {
  //다시 돌아오면 업데이트 해야함.
  const navigation = useNavigation();
  const [token, setToken] = React.useState('');
  const { data, loading, error, refetch, networkStatus, fetchMore } = useQuery<BoardsData>(GET_BOARDS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 2,
      limit: 10
    }
  });

  React.useEffect(() => {
    const getToken = async () => {
      const item = await AsyncStorage.getItem('token')
      if (item) {
        setToken(item);
      }
    }
    getToken();
  })

  //다시 돌아오면 업데이트 함
  useFocusEffect(
    React.useCallback(() => {
      try{
        refetch();
      }catch(err){}
    }, [])
  );
  // const handleLogout = async (e: GestureResponderEvent): Promise<void> => {
  //   e.preventDefault();
  //   try {
  //     await AsyncStorage.removeItem('token');
  //     setToken('');
  //     Alert.alert("성공");
  //   } catch (err) {
  //     console.log(err);
  //     Alert.alert("실패");
  //   }
  // }

  // const handleNavigateLogin = (e: GestureResponderEvent): void => {
  //   e.preventDefault();
  //   navigation.navigate('Login')
  // }

  const handleNavigateWrite = (e: GestureResponderEvent): void => {
    e.preventDefault();
    if (isLogin()) {
      navigation.navigate('WriteBoard')
    } else {
      Alert.alert("실패", "로그인해주세요");
    }
  }

  const handleNavigateBoard = (e: GestureResponderEvent, id: string): void => {
    console.log(e);
    navigation.navigate("Board", {
      id: id
    });
  }

  const handleOpenDrawer = (e: GestureResponderEvent): void => {
    e.preventDefault();
    navigation.dispatch(DrawerActions.openDrawer());
  }

  if (loading || networkStatus === 4) {
    return (<Loading />);
  }

  if (error) {
    Alert.alert("에러", error.message);
  }

  if (data && data !== null) {
    return (
      <BoardList
        data={data}
        getElaspedTime={getElaspedTime}
        handleNavigateBoard={handleNavigateBoard}
        handleNavigateWrite={handleNavigateWrite}
        handleOpenDrawer={handleOpenDrawer}
        token={token}
      />
    )
  }

  return <TextC fontSize={16}>비어있어요 ㅋㅋ</TextC>
}

export default BoardListContainer;