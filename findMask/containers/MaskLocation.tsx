import React, {useEffect, useState, memo} from 'react';
import * as Location from 'expo-location';
import {Alert} from 'react-native';
import MapContent from './MaskMap';
import Loading from '../components/Loading';
import {StyleSheet,View} from 'react-native';

export interface LocationType {
  coords: {
    latitude: number,
    longitude: number,
  }
}

const MaskLocation = () => {

  const [location, setLocation] = useState<LocationType>({
    coords: {
      latitude: 35.6632261,
      longitude: 128.4135929,
    }
  });
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    (async () => {
      try{
        setLoading(true);
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted'){
          throw new Error; 
        }

        const {
          coords: {
            latitude,
            longitude
          }
        } = await Location.getCurrentPositionAsync({});

        setLocation({
          coords: {
            latitude,
            longitude
          }
        });
        setLoading(false);
      } catch(err){
        Alert.alert("실패","다시 시도하시겠습니까?",[{
          text: "예",
          onPress: () => console.log('1'),
        },
        {
          text: "아니오",
          onPress: () => {
            setLoading(false);
          }
        }
      ])
      }
    })();
    return(() => {
      setLoading(false);
    })
  },[]);

  return (
    <View style={styles.container}>
      {loading ? <Loading/> :<MapContent coords={location.coords}/>}
    </View>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default memo(MaskLocation);