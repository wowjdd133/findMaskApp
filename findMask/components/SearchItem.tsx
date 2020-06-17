import {Store} from './StoreList'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import { MARKER_COLOR, REMAIN_STAT } from '../constants/MaskData';


const StoreItem = ((item:Store) => {

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


export default StoreItem;