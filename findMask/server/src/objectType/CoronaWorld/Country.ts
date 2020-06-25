import { ObjectType, Field } from "type-graphql";

export interface CountryType {
  Country?: string
  CountryCode?: string
  Slug?: string
  NewConfirmed?: number
  TotalConfirmed?: number
  NewDeaths?: number
  TotalDeaths?: number
  NewRecovered?: number
  TotalRecovered?: number
  Date?: string
}

@ObjectType()
export class Country {
  @Field()
  Country?: string
  @Field()
  CountryCode?: string
  @Field()
  Slug?: string
  @Field(() => Number)
  NewConfirmed?: number
  @Field(() => Number)
  TotalConfirmed?: number
  @Field(() => Number)
  NewDeaths?: number
  @Field(() => Number)
  TotalDeaths?: number
  @Field(() => Number)
  NewRecovered?: number
  @Field(() => Number)
  TotalRecovered?: number
  @Field()
  Date?: string
}