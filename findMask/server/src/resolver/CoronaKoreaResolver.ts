import { Resolver, Query } from "type-graphql";
import {CoronaKorea, CoronaKoreaType} from '../objectType/CoronaKorea';
import axios from "axios";
import 'dotenv/config';

@Resolver(() => CoronaKorea)
export class CoronaKoreaResolver{

  @Query(returns => CoronaKorea)
  async CoronaKoreas():Promise<CoronaKorea>{

    const serviceKey = process.env.API_KEY;

    try{
      const {data}:CoronaKoreaType = await axios.get(`http://api.corona-19.kr/korea?serviceKey=${serviceKey}`);

      return data;
    }catch(err){
      console.error(err);
      return null;
    }
  }
}
