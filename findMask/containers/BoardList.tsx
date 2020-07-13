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

interface OnReachedInfo {
  distanceFromEnd: number;
}

const BoardListContainer = () => {
  //다시 돌아오면 업데이트 해야함.
  const navigation = useNavigation();
  const [token, setToken] = React.useState('');
  const { data, loading, error, refetch, fetchMore } = useQuery<BoardsData>(GET_BOARDS, {
    variables: {
      offset: 0,
      limit: 20
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

  const handleEndReached = ({distanceFromEnd}:OnReachedInfo):void => {
    console.log(distanceFromEnd);
    try{
      fetchMore({
        variables:{
          offset: data!.boards.length
        },
        updateQuery: (prev, { fetchMoreResult}) => {
          if(!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            boards: [...prev.boards, ...fetchMoreResult.boards]
          });
        }
      })
    }catch(err){}
  }

  if (loading) {
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
        onEndReached={handleEndReached}
      />
    )
  }

  return <TextC fontSize={16}>비어있어요 ㅋㅋ</TextC>
}

export default BoardListContainer;