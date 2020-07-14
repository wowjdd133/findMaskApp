import * as React from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import EditBoard from '../components/board/EditBoard';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_BOARD, GET_BOARD } from '../querys/Board';
import { Alert } from 'react-native';
import Navigation from './Navigation';
import { DocumentNode } from 'graphql';


type RouteStackParamList = {
  data: {
    board: {
      title: string;
      id: string;
      content: string;
      getBoard: DocumentNode;
    }
  }
}

type EditProfileRouteProps = RouteProp<RouteStackParamList, 'data'>

const EditBoardContainer = () => {

  const route = useRoute<EditProfileRouteProps>();
  const navigation = useNavigation();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [updateBoard] = useMutation(UPDATE_BOARD,{
    refetchQueries: [{
      query: route.params.board.getBoard,
      variables: {
        id: route.params.board.id,
      }
    }],
    awaitRefetchQueries: true,
  });

  React.useEffect(() => {

    setTitle(route.params.board.title ?? '');
    setContent(route.params.board.content ?? '');

    return(() => {
      setTitle('');
      setContent('');
    })
  },[]);

  const handleModify = async () => {
    try{
      await updateBoard({
        variables:{
          id: route.params.board.id,
          title: title,
          content: content
        }
      })
      Alert.alert("성공","ㅋㅋ");
      navigation.goBack();
    }catch(err){
      Alert.alert("실패","아아")
    }
  }

  return(
    <EditBoard
      title={title}
      content={content}
      setTitle={setTitle}
      setContent={setContent}
      handleModify={handleModify}
    />
  )
}

export default EditBoardContainer;