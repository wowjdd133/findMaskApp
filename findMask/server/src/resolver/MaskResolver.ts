import { Resolver, Query, Arg, Field, ObjectType } from "type-graphql";
import {MaskData, Store, REMAIN_STAT, Mask} from '../types/Masks';
import axios, { AxiosPromise } from "axios";
import MaskObject from '../objectType/Mask/Mask';


@Resolver()
export class MaskResolver{
  @Query(returns => MaskObject,{nullable:true})
  async Masks(
    @Arg('lat') lat: number,
    @Arg('lng') lng: number,
    @Arg('m') m: number,
  ):Promise<Mask>
  {
    try{
      console.log(lat,lng,m);
      const data:MaskData = await axios.get(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${m}`);

      return data.data;
    }catch(err){
     return null; 
    }
  }
}