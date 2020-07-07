import React, { FunctionComponent, ComponentClass } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchItem from '../SearchItem';
import { StoreListProps } from '../../containers/StoreList';

interface StoreListCProps{
  datas: StoreListProps;
  renderSeparator: FunctionComponent<any> | ComponentClass<any, any> | null | undefined
  value: string;
  searchFilter: (text:string) => void;
}

const StoreList = ({datas, renderSeparator, value, searchFilter}: StoreListCProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={datas.stores}
        extraData={datas}
        keyExtractor={item => item.code}
        renderItem={({ item }) => {
          return (
            <SearchItem {...item} />)
        }}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={
          <SearchBar
            placeholder="검색"
            value={value}
            onChangeText={searchFilter}
          />
        }
      />
    </SafeAreaView>
  )
}

export default StoreList;