import * as React from 'react';
import { View, Text, Alert, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { GET_BOARD, GET_BOARDS, UP_VIEWCOUNT } from '../querys/Board';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import CardC from '../components/common/Card';
import TextC from '../components/common/Text';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputC from '../components/common/TextInput';
import ButtonC from '../components/common/Button';

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

  const [ upViewCount, {data:ViewCountData}] = useMutation(UP_VIEWCOUNT);

  // const [ writeComment, {data:commentData, loading:commentLoading, error:commentError}] = useMutation();
  
  React.useEffect(() => {
    upViewCount({
      variables:{
        id: route.params.id
      }
    });
  },[])


  const { data, loading, error } = useQuery<BoardData>(GET_BOARD, {
    variables: {
      id: route.params.id
    }
  });

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
            </CardC>
            <CardC flex={1}
              borderBottom={1}
              borderBottomColor="#ced4da">
              <CardC flex={1}>
                <TextC
                  fontSize={24}
                >{data.board.content}</TextC>
              </CardC>
            </CardC>
          </CardC>
          <CardC
            borderBottom={1}
            borderBottomColor="#ced4da">
              <CardC
                flex={1}
                row>
                  <TextInputC
                    placeholder="댓글쓰기"
                    setValue={setComment}
                    value={comment}
                    height="120px"
                  />
                  <ButtonC
                    stretch
                    backgroundColor="#eeeeee"
                    color="#ffffff"
                    width="20%"
                    onPress={(event:GestureResponderEvent) => {
                      event.preventDefault();
                      console.log('hi');
                    }}
                    title="댓글 등록"
                  />
              </CardC>
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
                      style={{ flex: 1, alignSelf:'stretch'}}
                      key={item.id}>
                      <CardC borderBottom={1}
                        borderBottomColor="#ced4da">
                        <TextC fontSize={32}>{item.title}</TextC>
                        <TextC fontSize={16}>{item.viewCount}</TextC>
                        <TextC fontSize={16}>{item.uid.name}</TextC>
                        <TextC fontSize={16}>{item.create_at}</TextC>
                        <TextC fontSize={16}>{item.update_at}</TextC>
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