import { ObjectType, Field } from "type-graphql";

export interface CityType{
    countryName: string
    newCase: string
    totalCase: string
    recovered: string
    death: string
    percentage: string
    newFcase: string
    newCcase: string
}

export interface CoronaKoreaCityType {
  data: CityType[]
};

@ObjectType()
export class CoronaKoreaCity {
  @Field(() => CityData)
  data: [CityData]
}

@ObjectType()
export class CityData {
  @Field()
  countryName: string
  @Field()
  newCase: string
  @Field()
  totalCase: string
  @Field()
  recovered: string
  @Field()
  death: string
  @Field()
  percentage: string
  @Field()
  newFcase: string
  @Field()
  newCcase: string
}