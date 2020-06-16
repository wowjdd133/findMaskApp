import React, {useMemo} from 'react';
import { StyleSheet, Text, View,FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import { useRoute } from '@react-navigation/native'
import { MARKER_COLOR, REMAIN_STAT} from '../constants/MaskData';
import { getDistanceFromLatLon, getElaspedTime} from '../utils/MaskUtil';

interface StoreListProps {
  count: number;
  stores:Store[];
}

interface Store {
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

const StoreItem = React.memo<Store>((item) => {
  
    return(
      <TouchableOpacity style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={{paddingTop: 5}}>{item.addr}</Text>
        <Text style={{color: MARKER_COLOR[item.remain_stat], paddingTop: 5, fontSize: 17}}>마스크 수: {REMAIN_STAT[item.remain_stat]}</Text>
        <View style={styles.flex}>
          <Text>{item.elapsedTime}</Text>
          <Text style={styles.distance}>{item.distance}km</Text>
        </View>
      </TouchableOpacity>
    )  
});

const StoreList = () => {

 const Route = useRoute();

 const data:StoreListProps = Route.params.data.Masks;
 const location:Location = Route.params.location;

 console.log('list');

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

  return(
    <SafeAreaView>
      <FlatList
        data={data.stores}
        keyExtractor={item => item.code}
        renderItem={({item}) => (
          <StoreItem {...item} />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 13,
  },
  name: {
    fontSize: 17,
    fontWeight: '700'
  },
  distance: {
    fontSize: 15,
    fontWeight: '500',
    color: '#00CCFF'
  }
  ,
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 7
  }
})

export default StoreList;