import { ObjectType, Field } from "type-graphql";

export interface CoronaKoreaType {
  data : {
    resultCode: string
    TotalCase: string
    TotalRecovered: string
    TotalDeath: string
    NowCase: string
    city1n: string
    city2n: string
    city3n: string
    city4n: string
    city5n: string
    city1p: string
    city2p: string
    city3p: string
    city4p: string
    city5p: string
    recoveredPercentage: number
    deathPercentage?: number
    checkingCounter: string
    checkingPercentage: string
    caseCount: string
    casePercentage: string
    notcaseCount: string
    notcasePercentage: string
    TotalChecking: string
    TodayRecovered: string
    TodayDeath: string
    TotalCaseBefore: string
    updateTime: string
    resultMessage: string
  }
}

@ObjectType()
export class CoronaKorea {
  @Field()
  resultCode: string;
  @Field()
  TotalCase: string;
  @Field()
  TotalRecovered: string;
  @Field()
  TotalDeath: string;
  @Field()
  NowCase: string;
  @Field()
  city1n: string;
  @Field()
  city2n: string;
  @Field()
  city3n: string;
  @Field()
  city4n: string;
  @Field()
  city5n: string;
  @Field()
  city1p: string;
  @Field()
  city2p: string;
  @Field()
  city3p: string;
  @Field()
  city4p: string;
  @Field()
  city5p: string;
  @Field(() => Number)
  recoveredPercentage: number
  @Field(() => Number,{nullable:true})
  deathPercentage?: number
  @Field()
  checkingCounter: string;
  @Field()
  checkingPercentage: string;
  @Field()
  caseCount: string;
  @Field()
  casePercentage: string;
  @Field()
  notcaseCount: string;
  @Field()
  notcasePercentage: string;
  @Field()
  TotalChecking: string;
  @Field()
  TodayRecovered: string;
  @Field()
  TodayDeath: string;
  @Field()
  TotalCaseBefore: string;
  @Field()
  updateTime: string;
  @Field()
  resultMessage: string;
}