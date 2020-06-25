import { ObjectType, Field } from "type-graphql";

export interface GlobalType {
  NewConfirmed?: number;
  TotalConfirmed?: number;
  NewDeaths?: number;
  TotalDeaths?: number;
  NewRecovered?: number;
  TotalRecovered?: number;
}

@ObjectType()
export class Global {
  @Field(() => Number)
  NewConfirmed?: number;
  @Field(() => Number)
  TotalConfirmed?: number;
  @Field(() => Number)
  NewDeaths?: number;
  @Field(() => Number)
  TotalDeaths?: number;
  @Field(() => Number)
  NewRecovered?: number;
  @Field(() => Number)
  TotalRecovered?: number;
}
