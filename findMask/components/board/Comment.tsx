import React from 'react';
import CardC from '../common/Card';
import TextInputC from '../common/TextInput';
import ButtonC from '../common/Button';
import { GestureResponderEvent } from 'react-native';
import TextC from '../common/Text';
import { Comment as CommentInterface } from './Board';
import CommentList from './CommentList';

interface CommentProps {
  comment: string;
  setComment: any;
  handleWriteComment: (e:GestureResponderEvent) => Promise<void>;
  handleRemoveComment: (e:GestureResponderEvent, id:string) => Promise<void>;
  comments: CommentInterface[] | undefined;
  getElaspedTime: (time: Date| string) => string;
}

const Comment = (props:CommentProps) => {

  const {
    comment,
    comments,
    handleWriteComment,
    setComment,
    getElaspedTime,
    handleRemoveComment
  } = props;

  return (
    <CardC
      flex={1}
      borderBottom={1}
      borderBottomColor="#ced4da">
      <CardC
        flex={1}
        row>
        <TextInputC
          placeholder="댓글쓰기"
          multiline={true}
          setValue={setComment}
          value={comment}
          height="100px"
        />
        <ButtonC
          stretch
          backgroundColor="#eeeeee"
          color="#000000"
          width="20%"
          onPress={handleWriteComment}
          title="댓글 등록"
        />
      </CardC>
      <CommentList
        comments={comments}
        getElaspedTime={getElaspedTime}
        handleRemoveComment={handleRemoveComment}
      />  
    </CardC>
  )
}

export default Comment;