import React from 'react';
import { StyleSheet, Text, Dimensions, Alert, Linking, GestureResponderEvent } from 'react-native'
import { LocationType } from './MaskLocation';
// import MarkerList from './MarkerList';
import { useQuery } from '@apollo/react-hooks'
import Loading from '../components/Loading';
import {MapEvent } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { MARKER_COLOR, REMAIN_STAT, LATITUDE_DELTA } from '../constants/MaskData';
import { GET_MASK_DATA } from '../querys/Corona';
import Map from '../components/mask/Map';

interface MaskInput {
  lat: number,
  lng: number,
  m: number,
};
export interface Store {
  name: string,
  addr: string,
  lat: number,
  lng: number,
  code: string,
  remain_stat: string,
  stock_at: string
}
export interface MaskData {
  Masks: {
    count: number,
    stores: Store[],
  }
}

interface LinkingWebProps {
  name: string;
  coords: Coords;
}

interface Coords {
  longitude: number;
  latitude: number;
}

interface NavigateProps {
  data: MaskData;
  location: Coords;
}

//Text 컬러를 styled-components 적용해서 바꿔보자.
const MaskMap = (props: LocationType) => {

  const navigation = useNavigation();

  const handleLinkingWeb = (event: MapEvent<{ action: "callout-press"}>, props:LinkingWebProps):void => {
    event.preventDefault();
    Alert.alert("웹페이지 연결", "길찾기를 위해 웹페이지 'map.kakao.com'으로 연결합니다.", [
      {
        text: '예',
        onPress: () => { Linking.openURL(`https://map.kakao.com/link/to/${props.name},${props.coords.latitude},${props.coords.longitude}`) }
      },
      {
        text: '아니오',
        onPress: () => { console.log('아뇨') }
      }
    ]);
  }

  const handleNavigateWithData = (e:GestureResponderEvent,props:NavigateProps) => {
    e.preventDefault();
    navigation.navigate("List", {
      data: {
        data:props.data,
        location: {
          lat: props.location.latitude,
          lng: props.location.longitude,
        }
      }
    });
  }

  if (props.coords) {
    console.log(props.coords);
    const { data, loading, error } = useQuery<MaskData, MaskInput>(GET_MASK_DATA, {
      variables: {
        lat: props.coords.latitude,
        lng: props.coords.longitude,
        m: 5000
      }
    });

    if (loading) {
      return <Loading />
    }

    if (error) {
      return <Text>error..</Text>
    }

    if (data) {
      console.log(data);
      
      const { height, width } = Dimensions.get("window");
      const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);

      return (
        <Map
          color={MARKER_COLOR}
          data={data}
          handleLinkingWeb={handleLinkingWeb}
          handleNavigateWithData={handleNavigateWithData}
          stat={REMAIN_STAT}
          region={{
            latitude: props.coords.latitude,
            latitudeDelta: LATITUDE_DELTA,
            longitude: props.coords.longitude,
            longitudeDelta: LONGITUDE_DELTA
          }}
        />
      )
    }
  }
  return <Text>비어있습니다.</Text>
}

export default MaskMap;
