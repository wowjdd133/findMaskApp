import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import CardC from '../common/Card';
import ListItem from '../ListItem';
import TextC from '../common/Text';
import { Board } from '../../containers/BoardList';
import { GestureResponderEvent } from 'react-native';
import BoardListItem from './BoardListItem';

interface BoardListCProps {
  boards: Board[];
  handleNavigateBoard: (e: GestureResponderEvent, id: string) => void;
  getElaspedTime: (time: string | Date) => string;
  ListHeaderComponent?: React.ReactNode;
}

const BoardListC = (props: BoardListCProps) => {

  const {
    boards,
    handleNavigateBoard,
    getElaspedTime,
    ListHeaderComponent
  } = props;

  return (
    <CardC flex={1}>
      <FlatList
        ListHeaderComponent={
          <>
            {ListHeaderComponent}
          </>
        }
        style={{ backgroundColor: '#eeeeee', alignSelf: "stretch" }}
        keyExtractor={item => item.id}
        data={boards}
        renderItem={({ item }) => {
          return (
            <BoardListItem
              getElaspedTime={getElaspedTime}
              handleNavigateBoard={handleNavigateBoard}
              item={item}
            />
          )
        }}
      />
    </CardC>
  )
}

export default BoardListC;