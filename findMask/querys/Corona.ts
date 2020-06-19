import gql from "graphql-tag";

export const GET_MASK_DATA = gql`
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

export const GET_CORONA_KOREA_DATA = gql`
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
  CoronaKoreaNew{
    data{
      countryName
      newCase
      totalCase
      death
      recovered
    }
  }
}
`