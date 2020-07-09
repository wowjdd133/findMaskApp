import React from "react";
import ListItem from "../ListItem";
import { GestureResponderEvent } from "react-native";
import { Board } from "../../containers/BoardList";
import CardC from "../common/Card";
import TextC from "../common/Text";

interface BoardListItemProps {
  item: Board;
  handleNavigateBoard: (e: GestureResponderEvent, id: string) => void;
  getElaspedTime: (time: string | Date) => string;
}

const BoardListItem = (props:BoardListItemProps) => {

  const {
    getElaspedTime,
    handleNavigateBoard,
    item
  } = props;

  return(
    <ListItem
    onPress={(e: GestureResponderEvent) => {
      console.log('e', e);
      handleNavigateBoard(e, item.id)
    }}
  >
    <CardC flex={2}>
      <TextC fontSize={16}>{item.viewCount}</TextC>
    </CardC>
    <CardC flex={7}>
      <TextC fontSize={24}>{item.title}</TextC>
    </CardC>
    <CardC flex={4}>
      <TextC fontSize={16}>{item.uid.name}</TextC>
      <TextC fontSize={16}>{getElaspedTime(item.create_at)}</TextC>
    </CardC>
  </ListItem>
  )
}

export default BoardListItem;

