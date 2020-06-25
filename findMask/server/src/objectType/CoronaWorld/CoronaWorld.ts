import { ObjectType, Field } from "type-graphql";
import {Country, CountryType} from './Country';
import {Global, GlobalType} from './Global';

export interface CoronaWorldType {
  data:{
    Countries: CountryType[];
    Global: GlobalType;
  }
}

@ObjectType()
export class CoronaWorld {
  @Field(() => Country)
  Countries: CountryType[];
  @Field(() => Global)
  Global: GlobalType;
}