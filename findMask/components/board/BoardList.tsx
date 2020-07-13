import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonC from '../common/Button';
import CardC from '../common/Card';
import { FlatList, GestureResponderEvent, Alert } from 'react-native';
import ListItem from '../ListItem';
import TextC from '../common/Text';
import { Board } from '../../containers/BoardList';
import { Icons } from '../../svgs'
import BoardListC from './BoardListC';

interface BoardListProps {
  // handleLogout: (e: GestureResponderEvent) => Promise<void>;
  // handleNavigateLogin: (e: GestureResponderEvent) => void;
  handleNavigateWrite: (e: GestureResponderEvent) => void;
  handleNavigateBoard: (e: GestureResponderEvent, id: string) => void;
  handleOpenDrawer: (e: GestureResponderEvent) => void;
  token: string;
  data: {
    boards: Board[];
  },
  getElaspedTime: (time: string | Date) => string;
  onEndReached?: (info: {
    distanceFromEnd: number;
  }) => void | null | undefined;
  refreshing?: boolean;
}

const BoardList = (props: BoardListProps) => {

  const {
    // handleLogout,
    data,
    handleNavigateBoard,
    // handleNavigateLogin,
    handleNavigateWrite,
    token,
    getElaspedTime,
    handleOpenDrawer,
    onEndReached,
    refreshing
  } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CardC row justifyContent="flex-end"
        borderBottom={1}
      >
        <CardC touchable
          justifyContent="center"
          onPress={handleNavigateWrite}
          marginTop={10}
          paddingBottom={10}
          marginRight={20}
        >
          <Icons.WriteIcon
            size={28}
            color="#000000"
          />
        </CardC>

        <CardC touchable
          onPress={handleOpenDrawer}
          marginTop={10}
          paddingBottom={10}
          marginRight={10}
        >
          <Icons.MenuIcon
            size={28}
            color="#646c64"
          />
        </CardC>

      </CardC>
      <BoardListC
        boards={data.boards}
        getElaspedTime={getElaspedTime}
        handleNavigateBoard={handleNavigateBoard}
        onEndReached={onEndReached}
        refreshing={refreshing}
      />
    </SafeAreaView>
  )
}

export default BoardList;