import React from 'react';
import gql from 'graphql-tag';
import {StyleSheet, Text, Dimensions, Alert, Linking} from 'react-native'
import {LocationType} from '../containers/Map';
// import MarkerList from './MarkerList';
import { useQuery } from '@apollo/react-hooks'
import Loading from './Loading';
import { FlatList,View,SafeAreaView } from 'react-native';
import MapView,{Marker, Callout} from 'react-native-maps';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const GET_MASK_DATA = gql`
  query getMasks($input:MaskInput!){
    Masks(input: $input){
      count
      stores{
        code,
        addr,
        name,
        lat,
        lng,
        remain_stat
      }
    }
  }
`;

interface MaskInput {
  input : {
    lat: number,
    lon: number,
    m: number,
  }
};
interface Stores {
  name: string,
  addr: string,
  lat: number,
  lng: number,
  code: string,
  remain_stat: string,
}
interface MaskData {
  Masks:{
    count: number,
    stores: [Stores]
  }
}

const Map = (props:LocationType) => {
    if(props.coords){
      const { data, loading, error} = useQuery<MaskData, MaskInput>(GET_MASK_DATA, {
        variables: {
          input:{
            lat: props.coords.latitude,
            lon: props.coords.longitude,
            m: 1000
          }
        }
      });
  
      if(loading) {
        return <Loading/>
      }
    
      if(error){
        return <Text>error..</Text>
      }
  
      if(data){
        const { height, width } = Dimensions.get("window");
        const LATITUDE_DELTA = 0.01501;
        const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
        const MARKER_COLOR = {
          plenty: "#40E0D0",
          few: "#7CFC00",
          some: "#FFA500",
          empty: "#ff0000",
          break: "#808080",
        };
        const REMAIN_STAT = {
          plenty: "30개 이상 100개 이하",
          few: "10개 이상 29개 이하",
          some: "2개 이상 9개 이하",
          empty: "0~1개",
          break: "판매 중지",
        }
  
        return (
              <MapView
                style={styles.mapStyle}
                initialRegion={{
                  latitude: props.coords.latitude,
                  longitude: props.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA
                }}
              >
                  {data.Masks.stores.map((item:Stores) => {
                    const color = MARKER_COLOR[item.remain_stat];
                    const stat = REMAIN_STAT[item.remain_stat];
  
                    return(
                      <Marker
                        pinColor={color}
                        key={item.code}
                        coordinate={{latitude:item.lat, longitude:item.lng}}
                      >
                        <Callout onPress={() => {
                          Alert.alert("웹페이지 연결","길찾기를 위해 웹페이지 'map.kakao.com'으로 연결합니다.",[
                            {
                              text: '예',
                              onPress: () => {Linking.openURL(`https://map.kakao.com/link/to/${item.name},${props.coords.latitude},${props.coords.longitude}`)}
                            },
                            {
                              text: '아니오',
                              onPress: () => {console.log('아뇨')}
                            }
                          ])
                        }}>
                          <View style={styles.callout}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.description}>{item.addr} {"\n"} {stat}</Text>
                          </View>
                        </Callout>
                      </Marker>
                    )
                  })}
              </MapView>
        )
    }
    }
    
  return <Text>hi</Text>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  callout:{
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  description: {
    fontSize: 12,
    textAlign: "center"
  }
});

export default Map;
