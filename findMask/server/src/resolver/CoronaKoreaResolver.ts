import { Resolver, Query } from "type-graphql";
import {CoronaKorea, CoronaKoreaType} from '../objectType/CoronaKorea';
import axios from "axios";

@Resolver(() => CoronaKorea)
export class CoronaKoreaResolver{
  @Query(returns => CoronaKorea)
  async CoronaKoreas():Promise<CoronaKorea>{
    try{
      const {data}:CoronaKoreaType = await axios.get('http://api.corona-19.kr/korea');

      return data;
    }catch(err){
      console.error(err);
      return null;
    }
  }
}
