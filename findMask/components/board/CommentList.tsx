import React from 'react';
import { Comment as CommentInterface} from './Board';
import CardC from '../common/Card';
import TextC from '../common/Text';
import { GestureResponderEvent } from 'react-native';
import ButtonC from '../common/Button';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: CommentInterface[] | undefined;
  getElaspedTime: (time: Date| string) => string;
  handleRemoveComment: (e:GestureResponderEvent, id:string) => Promise<void>;
}

const CommentList = (props:CommentListProps) => {
  
  const {
    comments,
    getElaspedTime,
    handleRemoveComment
  } = props;
  
  return(
    <>
    {comments && comments.length > 0 ? comments.map((item) => {
      return (
        <CommentItem
          getElaspedTime={getElaspedTime}
          handleRemoveComment={handleRemoveComment}
          item={item}
        />
      )
    }) : <CardC>
        <TextC fontSize={24}>댓글이 없습니다.</TextC>
      </CardC>}
    </>
  );
}

export default CommentList;