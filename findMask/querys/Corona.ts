import gql from "graphql-tag";

export const GET_MASK_DATA = gql`
query getMasks($lat:Float!, $lng:Float!, $m:Float!){
  Masks(lat:$lat lng:$lng m:$m){
    count
    stores{
      addr
      code
      created_at
      lat
      lng
      name
      remain_stat
      stock_at
      type
    }
  }
}
`;

export const GET_CORONA_KOREA_DATA = gql`
query getCoronaKorea{
  CoronaKoreas{
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
  CoronaKoreaCitys{
    data{
      countryName
      newCase
      totalCase
      recovered
      death
      percentage
      newFcase
      newCcase
    }
  }
}
`

export const GET_CORONA_WORLD_DATA = gql`
  query getCoronaWorld{
    CoronaWorlds{
      Global{
        NewConfirmed
        TotalConfirmed
        NewDeaths
        TotalDeaths
        NewRecovered
        TotalRecovered
      }
      Countries{
        Country
        CountryCode
        Slug
        NewConfirmed
        TotalConfirmed
        NewDeaths
        TotalDeaths
        NewRecovered
        TotalRecovered
        Date
      }
    }
  }
`