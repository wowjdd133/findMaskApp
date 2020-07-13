import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import KeyboardAwareScrollViewComponent from '../common/KeyboardAwareScrollView';
import { ScrollView } from 'react-native-gesture-handler';
import CardC from '../common/Card';
import TextC from '../common/Text';
import { Image, GestureResponderEvent } from 'react-native';
import TextInputC from '../common/TextInput';
import ButtonC from '../common/Button';
import ListItem from '../ListItem';
import Loading from '../Loading';
import Comment from './Comment';
import BoardListC from './BoardListC';

export interface Comment {
  id: string;
  content: string;
  create_at: Date;
  update_at: Date;
  author: {
    email: string;
    name: string;
  }
};

interface BoardProps {
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

  listLoading: boolean;
  getElaspedTime: (time: string | Date) => string;
  comment: string;
  setComment: any;
  handleWriteComment: (event: GestureResponderEvent) => Promise<void>;
  handleNavigateBoard: (event: GestureResponderEvent, id: string) => void;
  handleRemoveComment: (event: GestureResponderEvent, id: string) => Promise<void>;
  handleEditBoard: (event: GestureResponderEvent) => void;
  handleDeleteBoard: (id: string) => Promise<void>;
  onEndReached?: (info: {
    distanceFromEnd: number;
  }) => void | null | undefined;
  refreshing?: boolean;
}

const Board = (props: BoardProps) => {

  const {
    board,
    boards,
    comment,
    handleNavigateBoard,
    handleRemoveComment,
    handleWriteComment,
    listLoading,
    setComment,
    getElaspedTime,
    handleEditBoard,
    handleDeleteBoard,
    onEndReached,
    refreshing
  } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>

      {
        listLoading ? (
          <Loading />
        ) : (
            <BoardListC
              ListHeaderComponent={
                <>
                  <CardC flex={1}>
                    <CardC
                      flex={1}
                      borderBottom={1}
                      borderBottomColor="#ced4da"
                    >
                      <TextC
                        fontSize={32}
                        multiline
                      >{board.title}</TextC>
                      <CardC
                        flex={1}
                        justifyContent="space-evenly"
                        row
                      >
                        <TextC
                          fontSize={16}
                        >
                          조회: {board.viewCount}
                        </TextC>
                        <TextC
                          fontSize={16}
                        >{board.uid.name}</TextC>
                        <TextC
                          fontSize={16}
                        >
                          댓글: {board.comments ? board.comments.length : '0'}
                        </TextC>
                      </CardC>


                    </CardC>
                    <CardC row>
                      <ButtonC
                        backgroundColor="#000000"
                        color="#FFFFFF"
                        onPress={handleEditBoard}
                        title="수정하기"
                      />
                      <ButtonC
                        backgroundColor="#000000"
                        color="#FFFFFF"
                        onPress={() => handleDeleteBoard(board.id)}
                        title="삭제하기"
                      />
                    </CardC>

                    <CardC flex={8}
                      minHeight="300px"
                      borderBottom={1}
                      borderBottomColor="#ced4da">
                      <CardC flex={1}>
                        {board.image && (<Image
                          source={{ uri: board.image }}
                          style={{ width: '100%', height: 200, resizeMode: 'contain' }}
                        />)}
                        <TextC
                          multiline
                          fontSize={24}
                        >{board.content}</TextC>
                      </CardC>
                    </CardC>
                  </CardC>
                  <Comment
                    comments={board.comments}
                    comment={comment}
                    getElaspedTime={getElaspedTime}
                    handleRemoveComment={handleRemoveComment}
                    handleWriteComment={handleWriteComment}
                    setComment={setComment}
                  />
                </>}
              boards={boards}
              getElaspedTime={getElaspedTime}
              handleNavigateBoard={handleNavigateBoard}
              onEndReached={onEndReached}
              refreshing={refreshing}
            />
          )
      }
    </SafeAreaView>
  )
}

export default Board;