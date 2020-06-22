import React, {useState, useEffect} from 'react';
import {Text, View,FlatList, SafeAreaView} from 'react-native';
import { useRoute,RouteProp } from '@react-navigation/native'
import { getDistanceFromLatLon, getElaspedTime} from '../utils/MaskUtil';
import SearchBar from '../components/SearchBar';
import SearchItem from '../components/SearchItem';
import {Stores, MaskData} from './MaskMap';
import Loading from '../components/Loading';

interface StoreListProps {
  count: number;
  stores:Store[];
}

export interface Store {
  code: string,
  addr: string,
  name: string,
  lat: number,
  lng: number,
  distance?: string,
  elapsedTime?: string,
  remain_stat: string,
  stock_at: string
}

interface Location {
  lat: number,
  lng: number,
}

type RouteStackParamList = {
  data: {
    data: {
      data:MaskData;
      location: Location;
    }
  }
}

type StoreListRouteProps = RouteProp<RouteStackParamList, 'data'>

const StoreList = () => {
  
  console.log('StoreList');

  const [value, setValue] = useState('');
  const [datas, setDatas] = useState<StoreListProps>();
  
  const Route = useRoute<StoreListRouteProps>();
  const data:StoreListProps = Route.params.data.data.Masks;
  const location:Location = Route.params.data.location;

  const searchFilter = (text:string) => {
    if(datas){
      const newData = data.stores.filter(item => {
        return item.name.indexOf(text) > -1;
      })
    
      setDatas({
        count: datas.count,
        stores: newData
      });
      setValue(text);
    }
    
}

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  };

  useEffect(() => {
    if(data){
      data.stores.map((store) => {
        store.distance = getDistanceFromLatLon(store.lat,location.lat,store.lng, location.lng);
        store.elapsedTime = getElaspedTime(store.stock_at);
       })
      
       data.stores.sort((a,b) => {
         if(a.distance && b.distance){
          return a.distance < b.distance ? -1 : a.distance == b.distance ? 0 : 1
         }
         return a < b ? -1 : a == b ? 0 : 1;
       });
      
       setDatas(data);
     }
  },[]);

 return datas ? 
 (<SafeAreaView>
    <FlatList
      data={datas.stores}
      extraData={datas}
      keyExtractor={item => item.code}
      renderItem={({item}) => {
        return(
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
  </SafeAreaView>): (<Loading/>)
}

export default StoreList;