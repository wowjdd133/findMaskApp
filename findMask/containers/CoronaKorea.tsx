import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../components/Loading';
import { Text, View, StyleSheet } from 'react-native';
import KoreaIcon from '../svgs/Korea';
import PieChart from '../components/PieChart';

const GET_CORONA_KOREA_DATA = gql`
  query getCoronaKorea{
    CoronaKorea{
      resultCode
      TotalCase
      TotalRecovered
      TotalDeath
      NowCase
      city1n
      city2n
      city3n
      city4n
      city5n
      city1p
      city2p
      city3p
      city4p
      city5p
      resultMessage
      updateTime
      TotalCaseBefore
      TodayDeath
      TodayRecovered
      TotalChecking
      notcasePercentage
      notcaseCount
      casePercentage
      caseCount
      checkingPercentage
      checkingCounter
      deathPercentage
      recoveredPercentage
    }
  }
`

interface CoronaKoreaData {
  CoronaKorea:{
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
  }
}

const CoronaKorea = () => {
  const {loading,error,data} = useQuery<CoronaKoreaData>(
    GET_CORONA_KOREA_DATA
  );

  if(loading){
    return <Loading/>
  }

  if(error){
    console.error(error);
    return <Text>에러가..났어요..</Text>
  }

  console.log(data);
  if(data && data.CoronaKorea){
    const coronaData = data.CoronaKorea
    return (
      <View style={styles.container}>
        <View style={styles.dataBox}>
          <Text style={styles.titleText}>{coronaData.TotalCase}</Text>
          <KoreaIcon size={256} color={"#000000"}/>
        </View>
        <View style={styles.dataBox}>
          <Text>{coronaData.TodayDeath} </Text>
          <Text>{coronaData.TodayRecovered} </Text>
          <Text>{coronaData.TotalCaseBefore}</Text>
        </View>
        <View style={styles.dataBox}>
          <PieChart data={[]}/>
        </View>
      </View>
    )
  }

  return <Loading/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  dataBox: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 35,
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 55,
  }
})

export default CoronaKorea;