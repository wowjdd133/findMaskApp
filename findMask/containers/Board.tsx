import * as React from 'react';
import { View, Text, Alert, TouchableOpacity, GestureResponderEvent, Image } from 'react-native';
import { useRoute, RouteProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { GET_BOARD, GET_BOARDS, UP_VIEWCOUNT } from '../querys/Board';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import CardC from '../components/common/Card';
import TextC from '../components/common/Text';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputC from '../components/common/TextInput';
import ButtonC from '../components/common/Button';
import { WRITE_COMMENT, DELETE_COMMENT } from '../querys/Comment';
import {getElaspedTime} from '../utils/MaskUtil';

interface BoardData {
  board: {
    id: string;
    title: string;
    uid: {
      id: string;
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
      id: string;
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

type BoardRouteProps = RouteProp<RouteParamList, "data">

const Board = () => {

  const route = useRoute<BoardRouteProps>();
  const navigation = useNavigation();

  const [upViewCount, { data: ViewCountData }] = useMutation(UP_VIEWCOUNT);

  const [writeComment, { data: writeCommentData, loading: writeCommentLoading, error: writeCommentError }] = useMutation(WRITE_COMMENT);

  const [deleteComment, { data: deleteCommentData, loading : deleteCommentLoading, error: deleteCommentError}] = useMutation(DELETE_COMMENT);

  React.useEffect(() => {
    upViewCount({
      variables: {
        id: route.params.id
      }
    });
  }, []);
  
  const { data, loading, error, refetch, networkStatus } = useQuery<BoardData>(GET_BOARD, {
    variables: {
      id: route.params.id
    },
    fetchPolicy:'no-cache',
    notifyOnNetworkStatusChange: true
  });

  if (networkStatus == 4) {
    console.log('실패')
  }

  const { data: listData, loading: listLoading, error: listError } = useQuery<BoardsData>(GET_BOARDS)

  const [comment, setComment] = React.useState('');

  if (loading) {
    return (<Loading />)
  }

  if (error) {
    Alert.alert("에러", error.message);
  }

  if (data) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <CardC flex={1}>
            <CardC
              height="100px"
              borderBottom={1}
              borderBottomColor="#ced4da">
              <TextC
                fontSize={32}
              >{data.board.title}</TextC>
              <TextC
                fontSize={16}
              >{data.board.uid.name}</TextC>
              <TextC
                fontSize={16}
              >
                {data.board.viewCount}
              </TextC>
            </CardC>
            <CardC flex={1}
              minHeight="300px"
              borderBottom={1}
              borderBottomColor="#ced4da">
              <CardC flex={1}>
                {data.board.image && (<Image
                  source={{uri: data.board.image}}
                  style={{width: '100%', height: 200, resizeMode:'contain'}}
                />)}
                <TextC
                  fontSize={24}
                >{data.board.content}</TextC>
              </CardC>
            </CardC>
          </CardC>
          <CardC
            flex={1}
            borderBottom={1}
            borderBottomColor="#ced4da">
            <CardC
              flex={1}
              row>
              <TextInputC
                placeholder="댓글쓰기"
                setValue={setComment}
                value={comment}
                height="100px"
              />
              <ButtonC
                stretch
                backgroundColor="#eeeeee"
                color="#ffffff"
                width="20%"
                onPress={async (event: GestureResponderEvent) => {
                  event.preventDefault();
                  try {
                    await writeComment({
                      variables: {
                        bid: data.board.id,
                        content: comment
                      }
                    });
                    refetch();
                    Alert.alert("글쓰기 성공");
                  } catch (err) {
                    Alert.alert("글쓰기 실패", err.message)
                    console.log(err);
                  }
                }}
                title="댓글 등록"
              />
            </CardC>
            {data.board.comments && data.board.comments.length > 0 ? data.board.comments.map((item) => {
              console.log(item);
              return (
                <CardC flex={1} row borderBottom={1} borderBottomColor="#e3e3e3" key={item.id}>
                  <TextC fontSize={16}>{item.content} </TextC>
                  <TextC fontSize={16}>{item.author.name} </TextC>
                  <TextC fontSize={16}>{getElaspedTime(item.update_at)} </TextC>
                  <ButtonC
                    backgroundColor="#eeeeee"
                    color="#ffffff"
                    onPress={async() => {
                      try{
                        await deleteComment({
                          variables:{
                            id: item.id
                          }
                        });
                        refetch();
                        Alert.alert("성공");
                      } catch(err){
                        console.log(err);
                        Alert.alert("실패")
                      }
                    }}
                    title="삭제"
                  />
                </CardC>
              )
            }) : <CardC>
              <TextC fontSize={24}>댓글이 없습니다.</TextC>
              </CardC>}
          </CardC>
          <CardC>
            {
              listLoading ? (
                <Loading />
              ) : (
                  listData!.boards.map((item) => (
                    <TouchableOpacity
                      onPress={(event: GestureResponderEvent) => {
                        navigation.navigate("Board", {
                          id: item.id
                        });
                      }}
                      style={{ flex: 1, alignSelf: 'stretch' }}
                      key={item.id}>
                      <CardC borderBottom={1}
                        borderBottomColor="#ced4da">
                        <TextC fontSize={32}>{item.title}</TextC>
                        <TextC fontSize={16}>{item.viewCount}</TextC>
                        <TextC fontSize={16}>{item.uid.name}</TextC>
                        <TextC fontSize={16}>{getElaspedTime(item.update_at)}</TextC>
                      </CardC>
                    </TouchableOpacity>
                  ))
                )
            }
          </CardC>
        </ScrollView>
      </SafeAreaView>

    )
  }

  return <Text>hi</Text>

}

export default Board;