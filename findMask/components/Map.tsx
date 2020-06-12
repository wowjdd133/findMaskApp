import React,{useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Text, Dimensions, Alert} from 'react-native'
import * as Location from 'expo-location';
import Loading from './Loading';

interface LocationType {
  coords?: {
    accuracy: number,
    altitude: number,
    heading: number,
    latitude: number,
    longitude: number,
    speed: number,
  }
}

const Map = () => {
  const [location, setLocation] = useState<LocationType>({});
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    (async () => {
      try{
        setLoading(true);
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted'){
          throw new Error; 
        }

        let location = await Location.getCurrentPositionAsync({});
        
        setLocation(location);
        setLoading(false);
        
      } catch(err){
        Alert.alert("실패","다시 시도하시겠습니까?",[{
          text: "예",
          onPress: () => console.log('1'),
        },
        {
          text: "아니오",
          onPress: () => console.log('2'),
        }
      ])
      }
    })();
    return() => {
      setLoading(false);
      setLocation({});
    }
  },[])

  return loading ? <Loading/> : 
  <MapView
    style={styles.mapStyle}
    initialRegion={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0832,
    }}
  />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})

export default Map;
