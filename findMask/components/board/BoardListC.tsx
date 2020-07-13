import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import CardC from '../common/Card';
import ListItem from '../ListItem';
import TextC from '../common/Text';
import { Board } from '../../containers/BoardList';
import { GestureResponderEvent, ActivityIndicator } from 'react-native';
import BoardListItem from './BoardListItem';
import Loading from '../Loading';

interface BoardListCProps {
  boards: Board[];
  handleNavigateBoard: (e: GestureResponderEvent, id: string) => void;
  getElaspedTime: (time: string | Date) => string;
  ListHeaderComponent?: React.ReactNode;
  onEndReached?: ((info: {
    distanceFromEnd: number;
  }) => void) | null | undefined;
  refreshing?: boolean;
}

const BoardListC = (props: BoardListCProps) => {

  const {
    boards,
    handleNavigateBoard,
    getElaspedTime,
    ListHeaderComponent,
    onEndReached,
    refreshing
  } = props;

  return (
    <CardC flex={1} height="100%">
      <FlatList
        ListHeaderComponent={
          <>
            {ListHeaderComponent}
          </>
        }
        style={{ backgroundColor: '#eeeeee', alignSelf: "stretch" }}
        keyExtractor={item => item.id}
        data={boards}
        onEndReached={onEndReached}
        onEndReachedThreshold={1}
        refreshing={refreshing}
        renderItem={({ item }) => {
          return (
            <BoardListItem
              getElaspedTime={getElaspedTime}
              handleNavigateBoard={handleNavigateBoard}
              item={item}
            />
          )
        }}
        ListFooterComponent={() => (
          <Loading/>
        )
        }
      />
    </CardC>
  )
}

export default BoardListC;