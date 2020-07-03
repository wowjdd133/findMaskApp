import { Resolver, Query } from "type-graphql";
import {CoronaKoreaCity, CoronaKoreaCityType} from '../objectType/CoronaKoreaCity';
import axios from "axios";

@Resolver(() => CoronaKoreaCity)
export class CoronaKoreaCityResolver {
  @Query(returns => CoronaKoreaCity)
  async CoronaKoreaCitys(): Promise<CoronaKoreaCity>{
    
    const serviceKey = process.env.API_KEY;

    try{
      let { data } = await axios.get(`http://api.corona-19.kr/korea/country/new?serviceKey=${serviceKey}`);

      data = Object.values(data);
      data.shift();
      data.shift();

      return {data:data};
    }catch(err){
      console.error(err);
      return null
    }
  }
}
