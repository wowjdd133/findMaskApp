import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import KoreaIcon from '../svgs/Korea';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import { GET_CORONA_KOREA_DATA } from '../querys/Corona'
import { SafeAreaView } from 'react-native-safe-area-context';

export interface CityType {
  countryName: string;
  newCase: string | number;
  totalCase: string;
  death: string;
  recovered: string;
}

export interface CoronaKoreaData {
  CoronaKoreas: {
    resultCode: string;
    TotalCase: string;
    TotalRecovered: string;
    TotalDeath: string;
    NowCase: string;
    city1n: string;
    city2n: string;
    city3n: string;
    city4n: string;
    city5n: string;
    city1p: string;
    city2p: string;
    city3p: string;
    city4p: string;
    city5p: string;
    resultMessage: string;
    updateTime: string;
    TotalCaseBefore: string;
    TodayDeath: string;
    TodayRecovered: string;
    TotalChecking: string;
    notcasePercentage: string;
    notcaseCount: string;
    casePercentage: string;
    caseCount: string;
    checkingPercentage: string;
    checkingCounter: string;
    deathPercentage: number;
    recoveredPercentage: number;
  },
  CoronaKoreaCitys: {
    data: CityType[]
  }
}

const CoronaKorea = () => {

  console.log(Dimensions.get("screen").width);
  console.log('hi');

  const { loading, error, data } = useQuery<CoronaKoreaData>(
    GET_CORONA_KOREA_DATA
  );

  if (loading) {
    return <Loading />
  }

  if (error) {
    console.error(error);
    return <Text>에러가..났어요..</Text>
  }

  if (data) {
    const coronaData = data.CoronaKoreas
    let coronaCity = data.CoronaKoreaCitys.data;
    const koreaData = coronaCity.shift();
    const chartData = coronaCity.filter((item) => item.newCase !== '0').map((item) => {
      item.newCase = Number(item.newCase);
      return item;
    })

    const CityList =
      coronaCity.map((data) => {
        const regex = /,/gi;
        return (
          <View key={data.countryName}
            style={{
              width: "49%",
              borderWidth: 1,
              height: 175,
              borderRadius: 25,
              alignItems: "center",
              marginVertical: 15,
              justifyContent: "space-evenly"
            }}>
            <Text style={{ fontSize: 25 }}>{data.countryName}</Text>
            <View style={{
              borderRadius: 25,
              width: "95%",
              borderWidth: 1,
              alignItems: "center",
              borderColor: "black",
              justifyContent: "center"
            }}>
              <Text style={{ fontSize: 17 }}>격리중: {Number(data.totalCase.replace(regex, '')) - Number(data.death.replace(regex, '')) - Number(data.recovered.replace(regex, ''))}</Text>
            </View>
            <Text style={{ fontSize: 17 }}>총 확진자: {data.totalCase}</Text>
            <Text style={{ fontSize: 17 }}>사망: {data.death}</Text>
            <Text style={{ fontSize: 17 }}>격리해제: {data.recovered}</Text>
          </View>
        )
      })

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.dataBox}>
            <View style={{ paddingLeft: 35 }}>
              <Text style={{ fontSize: 25 }}>대한민국 총 확진자</Text>
              <Text style={styles.titleText}>{coronaData.TotalCase}명</Text>
            </View>
            <KoreaIcon size={164} color={"#ababab"} />
          </View>
          <View style={styles.dataBox}>
            <Text style={{ fontSize: 25 }}>사망</Text>
            <Text style={styles.titleText}>{coronaData.TotalDeath}명</Text>
          </View>
          <View style={styles.dataBox}>
            <Text style={{ fontSize: 25 }}>격리해제</Text>
            <Text style={styles.titleText}>{coronaData.TotalRecovered}명</Text>
          </View>
          <View style={styles.dataBox}>
            <BarChart
              labels={["오늘 사망자", "오늘 격리해제", "오늘 확진자"]}
              data={[parseInt(coronaData.TodayDeath), parseInt(coronaData.TodayRecovered), parseInt(koreaData!.newCase)]}
            />
          </View>
          <View style={styles.dataBox}>
            {chartData === null ? <Text>확진자가 없습니다~!</Text> : <PieChart text={"오늘 확진자 비율"} data={chartData} x="countryName" y="newCase" />}
          </View>
          <View style={styles.dataBox}>
            <View style={{
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              {CityList}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  return <Loading />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  dataBox: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 2,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 55,
  }
})

export default CoronaKorea;