import React from 'react';
import gql from 'graphql-tag';
import {StyleSheet, Text, Dimensions, Alert, Linking, Button} from 'react-native'
import {LocationType} from '../containers/MaskMap';
// import MarkerList from './MarkerList';
import { useQuery } from '@apollo/react-hooks'
import Loading from './Loading';
import { FlatList,View,SafeAreaView } from 'react-native';
import MapView,{Marker, Callout} from 'react-native-maps';
import {useNavigation } from '@react-navigation/native';
import { MARKER_COLOR, REMAIN_STAT, LATITUDE_DELTA } from '../constants/MaskData';

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
        remain_stat,
        stock_at
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
  stock_at: string
}
interface MaskData {
  Masks:{
    count: number,
    stores: [Stores]
  }
}

//Text 컬러를 styled-components 적용해서 바꿔보자.
const MaskMap = (props:LocationType) => {

  const navigation = useNavigation();

  console.log('maskMapComponent');

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
        const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

        return (
          <SafeAreaView style={styles.container}>
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
            <View style={styles.showOnView}>
                <Button
                  onPress={() => {
                    navigation.navigate("List",{
                      data,
                      location: {
                        lat: props.coords.latitude,
                        lng: props.coords.longitude,
                      }
                    });
                  }}
                  title="이건 되겠지"
                />

              </View>
            </SafeAreaView>
          )
      }
    }
    
  return <Text>hi</Text>
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  showOnView: {
    position: "absolute",
    top: '50%',
    alignSelf: 'flex-end'
  },
  mapStyle: {
    flex: 1,
  },
  callout:{
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  description: {
    fontSize: 12,
    textAlign: "center"
  }
});

export default MaskMap;