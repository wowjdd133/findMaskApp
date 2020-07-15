import React from 'react';
import MapView, { Marker, Callout, MapEvent } from 'react-native-maps';
import CardC from '../common/Card';
import TextC from '../common/Text';
import { Store } from '../../containers/MaskMap';
import { Alert, Linking, GestureResponderEvent, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonC from '../common/Button';
import { ConstObject } from '../../constants/MaskData';

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

interface MaskData {
  Masks: {
    count: number,
    stores: Store[],
  }
}

interface MapProps {
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  data: MaskData;
  handleNavigateWithData: (e: GestureResponderEvent, props: NavigateProps) => void;
  handleLinkingWeb: (event: MapEvent<{ action: "callout-press"}>, props: LinkingWebProps) => void;
  color: ConstObject;
  stat: ConstObject;
}

interface MarkerListProps {
  color: ConstObject;
  stat: ConstObject;
  stores: Store[];
}

const MarkerList = ({ stores, color, stat }: MarkerListProps) => {
  return (
    <>
      {stores.map((item) => {
        const pinColor = color[item.remain_stat];
        const storeStat = stat[item.remain_stat];

        console.log(item.lat, item.lng);

        return (
          <Marker
            pinColor={pinColor}
            key={item.code}
            coordinate={{ latitude: item.lat, longitude: item.lng }}
          >
            <Callout onPress={() => {
              Alert.alert("웹페이지 연결", "길찾기를 위해 웹페이지 'map.kakao.com'으로 연결합니다.", [
                {
                  text: '예',
                  onPress: () => { Linking.openURL(`https://map.kakao.com/link/to/${item.name},${item.lat},${item.lng}`) }
                },
                {
                  text: '아니오',
                  onPress: () => { console.log('아뇨') }
                }
              ])
            }}>
              <CardC flex={1} >
                <TextC fontSize={32}>{item.name}</TextC>
                <TextC fontSize={16}>{item.addr} {"\n"} {storeStat}</TextC>
              </CardC>
            </Callout>
          </Marker>
        )
      })
      }
    </>
  )
};

const MapComponent = (props: MapProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={props.region}
      >
        {props.data.Masks && <MarkerList
          stores={props.data.Masks.stores}
          color={props.color}
          stat={props.stat}
        />}
      </MapView>
      <View style={{ position: "absolute", bottom: "0%", alignSelf: 'flex-end' }}>
        <ButtonC
          backgroundColor="green"
          color="gray"
          onPress={(e: GestureResponderEvent) => props.handleNavigateWithData(e, {
            data: props.data,
            location: {
              latitude: props.region.latitude,
              longitude: props.region.longitude,
            }
          })}
          title="리스트"
        />
      </View>
    </SafeAreaView>
  )
}

export default MapComponent;