import React from 'react';
import CardC from '../common/Card';
import TextC from '../common/Text';
import ButtonC from '../common/Button';
import { GestureResponderEvent } from 'react-native';
import { Comment as CommentProps } from './Board';

interface CommentItemProps {
  item: CommentProps;
  getElaspedTime: (time: Date | string) => void;
  handleRemoveComment: (e:GestureResponderEvent, id: string) => Promise<void>;
}

const CommentItem = (props: CommentItemProps) => {

  const {
    getElaspedTime,
    handleRemoveComment,
    item
  } = props;

  return (
    <CardC flex={1} align="flex-start" borderBottom={1} borderBottomColor="#e3e3e3" key={item.id}>
      <CardC flex={1} row justifyContent="space-evenly">
        <TextC fontSize={16}>{item.author.name} </TextC>
        <TextC fontSize={16}>{getElaspedTime(item.update_at)} </TextC>
      </CardC>
      <TextC fontSize={16} marginTop={10}>{item.content} </TextC>
      <CardC flex={1} align="flex-start">
        <ButtonC
          backgroundColor="#eeeeee"
          color="#ffffff"
          align='flex-end'
          onPress={(e: GestureResponderEvent) => handleRemoveComment(e, item.id)}
          title="삭제"
        />
      </CardC>
    </CardC>
  )
}

export default CommentItem;