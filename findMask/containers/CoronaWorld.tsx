import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CORONA_WORLD_DATA } from '../querys/Corona';
import Loading from '../components/Loading';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { COUNTRY_CODE } from '../constants/CountryCode';

interface CoronaWorldData {
  CoronaWorlds: {
    Global: {
      NewConfirmed: number,
      TotalConfirmed: number,
      NewDeaths: number,
      TotalDeaths: number,
      NewRecovered: number,
      TotalRecovered: number,
    }
    Countries: {
      Country: string,
      CountryCode: string,
      slug: string,
      NewConfirmed: number,
      TotalConfirmed: number,
      NewDeaths: number,
      TotalDeaths: number,
      NewRecovered: number,
      TotalRecovered: number,
      Date: string,
    }[]
  }
}

const CoronaWorld = () => {

  const { data, loading, error } = useQuery<CoronaWorldData>(GET_CORONA_WORLD_DATA);

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.log(error);
    return <Text>에러가 났어여</Text>
  }

  const addCommaToNum = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  if (data) {
    const totalData = data.CoronaWorlds.Global;
    let countriesData = data.CoronaWorlds.Countries;
    countriesData.sort((a, b) => {
      return b.TotalConfirmed - a.TotalConfirmed;
    });
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.dataBox}>
            <Text>확진자</Text>
            <Text>{addCommaToNum(totalData.TotalConfirmed)}{"\n"} +({addCommaToNum(totalData.NewConfirmed)})</Text>
          </View>
          <View style={styles.dataBox}>
            <Text>사망</Text>
            <Text>{addCommaToNum(totalData.TotalDeaths)}{"\n"} +({addCommaToNum(totalData.NewDeaths)})</Text>
          </View>
          <View style={styles.dataBox}>
            <Text>격리해제</Text>
            <Text>{addCommaToNum(totalData.TotalRecovered)} {"\n"}+({addCommaToNum(totalData.NewRecovered)})</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={countriesData}
            keyExtractor={(item) => item.CountryCode}
            ListHeaderComponent={
              <View style={{ flexDirection: 'row', borderBottomWidth: 1, backgroundColor: '#F8F9FA' }}>
                <Text style={{ flex: 2, textAlign: 'center' }}>나라</Text>
                <Text style={{ flex: 1 }}>확진자</Text>
                <Text style={{ flex: 1 }}>사망자</Text>
                <Text style={{ flex: 1 }}>격리해제</Text>
              </View>
            }
            renderItem={({ item }) => {
              return (
                <TouchableOpacity>
                  <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderBottomWidth: 0.5, borderBottomColor: "#e2e2e2" }}>
                    <Text style={{ flex: 2, fontSize: 17, textAlignVertical: 'center', textAlign: 'center' }}>{COUNTRY_CODE[item.CountryCode]}</Text>
                    <Text style={{ flex: 1 }}>{addCommaToNum(item.TotalConfirmed)} {"\n"}<Text style={{ color: 'red' }}>(+{addCommaToNum(item.NewConfirmed)}</Text>)</Text>
                    <Text style={{ flex: 1 }}>{addCommaToNum(item.TotalDeaths)}{"\n"} <Text style={{ color: 'red' }}>(+{addCommaToNum(item.NewDeaths)})</Text></Text>
                    <Text style={{ flex: 1 }}>{addCommaToNum(item.TotalRecovered)} {"\n"}<Text style={{ color: 'green' }}>(+{addCommaToNum(item.NewRecovered)})</Text></Text>
                  </View>
                </TouchableOpacity>
              )
            }
            }
          />
        </View>

      </SafeAreaView>
    )
  }

  return <Text>hu</Text>
}

const styles = StyleSheet.create({
  dataBox: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 2,
    flexDirection: 'row',
    flex:1,
  },
})

export default CoronaWorld;