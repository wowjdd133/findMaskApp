import * as React from 'react';
import { View, Text, Alert, TouchableOpacity, GestureResponderEvent, Image } from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { GET_BOARD, GET_BOARDS, UP_VIEWCOUNT, DELETE_BOARD } from '../querys/Board';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import CardC from '../components/common/Card';
import TextC from '../components/common/Text';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputC from '../components/common/TextInput';
import ButtonC from '../components/common/Button';
import { WRITE_COMMENT, DELETE_COMMENT } from '../querys/Comment';
import { getElaspedTime } from '../utils/MaskUtil';
import ListItem from '../components/ListItem';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardAwareScrollViewComponent from '../components/common/KeyboardAwareScrollView';
import Board from '../components/board/Board';
import { ApolloError } from 'apollo-client';
import { isLogin } from '../utils/loginUtil';

interface BoardData {
  board: {
    id: string;
    title: string;
    uid: {
      email: string;
      name: string;
    }
    content: string;
    create_at: Date;
    update_at: Date;
    viewCount: number;
    image?: string;
    comments?: {
      id: string;
      content: string;
      create_at: Date;
      update_at: Date;
      author: {
        email: string;
        name: string;
      }
    }[]
  };
}

interface BoardsData {
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
    image?: string;
  }[];
}

type RouteParamList = {
  data: {
    id: string;
  }
}

interface OnReachedInfo {
  distanceFromEnd: number;
}

type BoardRouteProps = RouteProp<RouteParamList, "data">

const BoardContainer = () => {

  const route = useRoute<BoardRouteProps>();
  const navigation = useNavigation();
  const [disabled, setDisabled] = React.useState(false);

  const [upViewCount, { data: ViewCountData }] = useMutation(UP_VIEWCOUNT);

  const [writeComment, { data: writeCommentData, loading: writeCommentLoading, error: writeCommentError }] = useMutation(WRITE_COMMENT, {
    refetchQueries: [{
      query: GET_BOARD, variables: {
        id: route.params.id
      }
    }],
    awaitRefetchQueries: true,
  });

  const [deleteComment, { data: deleteCommentData, loading: deleteCommentLoading, error: deleteCommentError }] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{
      query: GET_BOARD, variables: {
        id: route.params.id
      }
    }],
    awaitRefetchQueries: true,
  });

  const [deleteBoard] = useMutation(DELETE_BOARD);

  React.useEffect(() => {
    upViewCount({
      variables: {
        id: route.params.id
      }
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      try{
        refetch();
      }catch(err){}
    },[])
  );

  const { data, loading, error, refetch, networkStatus } = useQuery<BoardData>(GET_BOARD, {
    variables: {
      id: route.params.id
    },
    notifyOnNetworkStatusChange: true
  });
  
  const { data: listData, loading: listLoading, fetchMore,networkStatus: listNetworkStatus, error: listError } = useQuery<BoardsData>(GET_BOARDS,{
    variables: {
      offset: 0,
      limit: 20
    },
    notifyOnNetworkStatusChange: true,
  })

  const [comment, setComment] = React.useState('');

  const handleEndReached = ({distanceFromEnd}:OnReachedInfo):void => {
    console.log(distanceFromEnd);
    try{
      fetchMore({
        variables:{
          offset: listData!.boards.length
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

  const handleWriteComment = async (e: GestureResponderEvent): Promise<void> => {
    console.warn(route.params.id);
    e.preventDefault();
    setDisabled(true);
    try {
      const boardId = await writeComment({
        variables: {
          bid: data!.board.id,
          content: comment
        }
      });

      if (!boardId.data.writeComment) {
        throw new Error("다시 로그인해주세요");
      }
      Alert.alert("댓글쓰기 성공");
    } catch (err) {
      Alert.alert("댓글쓰기 실패", err.message)
      console.log(err);
    } finally{
      setDisabled(false);
    }
  }

  const handleNavigateBoard = (e: GestureResponderEvent, id: string) => {
    navigation.navigate("Board", {
      id: id
    });
  }

  const handleDeleteBoard = async (id: string): Promise<void> => {
    if(isLogin()){
      try {
        setDisabled(true);
        await deleteBoard({
          variables: {
            id: id
          }
        })
        Alert.alert("성공")
      } catch{
        Alert.alert("실패", "다시 시도해주세요");
      } finally{
        setDisabled(false);
      }
  
      navigation.goBack();
    } else {
      Alert.alert("실패","로그인해주세요");
    }
  }

  const handleEditBoard = (e: GestureResponderEvent) => {
    e.preventDefault();
    setDisabled(true);
    if(isLogin()){
      navigation.navigate("EditBoard", {
        board: {
          id: data!.board.id,
          title: data!.board.title,
          content: data!.board.content,
          getBoard: GET_BOARD,
        }
      });
    } else {
      Alert.alert("실패","로그인해주세요");
    }
    setDisabled(false);
    
  }

  const handleRemoveComment = async (e: GestureResponderEvent, id: string): Promise<void> => {
    e.preventDefault();
    if(isLogin()){
      try {
        await deleteComment({
          variables: {
            id: id
          }
        });
        Alert.alert("성공");
      } catch (err) {
        Alert.alert("실패")
      }
    }
    else {
      Alert.alert("실패","로그인해주세요");
    }
  }

  if (loading) {
    return (<Loading />)
  }

  if (error) {
    Alert.alert("에러", error.message);
  }

  if (data && listData) {
    return (
      <Board
        board={data.board}
        boards={listData!.boards}
        comment={comment}
        getElaspedTime={getElaspedTime}
        handleNavigateBoard={handleNavigateBoard}
        handleRemoveComment={handleRemoveComment}
        handleWriteComment={handleWriteComment}
        listLoading={listLoading}
        setComment={setComment}
        handleEditBoard={handleEditBoard}
        handleDeleteBoard={handleDeleteBoard}
        onEndReached={handleEndReached}
        disabled={disabled}
      />
    )
  }

  return <Text>잘 못된 board입니다.</Text>

}

export default BoardContainer;