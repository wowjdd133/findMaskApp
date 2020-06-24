import { Resolver, Query } from "type-graphql";
import {CoronaWorld, CoronaWorldType} from '../objectType/CoronaWorld/CoronaWorld';
import axios from "axios";

@Resolver(() => CoronaWorld)
export class CoronaWorldResolver {
  @Query(returns => CoronaWorld)
  async CoronaWorlds():Promise<CoronaWorld>{
    try{
      const {data}:CoronaWorldType = await axios.get('https://api.covid19api.com/summary');

      return data;
    }catch(err){
      return null;
    }
  }
}