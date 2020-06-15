import React, {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import {Alert} from 'react-native';
import MapContent from '../components/Map';
import Loading from '../components/Loading';
import {StyleSheet,View} from 'react-native';

export interface LocationType {
  coords?: {
    latitude: number,
    longitude: number,
  }
}

const Map = () => {

  const [location, setLocation] = useState<LocationType>({
    coords: {
      latitude: 35.9349066,
      longitude: 128.5471027,
    }
  });

  useEffect(() => {
    (async () => {
      try{
        let { status } = await Location.requestPermissionsAsync();
        console.log('status',status);
        if (status !== 'granted'){
          throw new Error; 
        }

        const {
          coords: {
            latitude,
            longitude
          }
        } = await Location.getCurrentPositionAsync({});

        console.log(latitude,longitude);

        setLocation({
          coords: {
            latitude,
            longitude
          }
        });
      } catch(err){
        Alert.alert("실패","다시 시도하시겠습니까?",[{
          text: "예",
          onPress: () => console.log('1'),
        },
        {
          text: "아니오",
          onPress: () => {
            console.log('return');
          }
        }
      ])
      }
    })();
  },[]);

  return (
    <View style={styles.container}>
      {location === null ? <Loading/> :<MapContent coords={location.coords}/>}
    </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default Map;