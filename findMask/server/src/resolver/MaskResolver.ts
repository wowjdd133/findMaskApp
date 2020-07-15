import { Resolver, Query, Arg, Field, ObjectType } from "type-graphql";
import {MaskData, Store, Mask} from '../types/Masks';
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
      // const data:MaskData = await axios.get(`https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${m}`);

      const examData = {
        count: 15,
        stores: [{
          addr: "대구광역시 달성군 구지면 응암리 173",
          code: "1",
          created_at:"2020/07/08 13:00:00",
          lat: 35.64231,
          lng: 128.43125,
          name: "바른손약국",
          remain_stat:"few",
          stock_at:"2020/07/08 13:00:00",
          type:"01"
        },{
          addr: "대구광역시 달성군 구지면 응암리 172",
          code: "2",
          created_at:"2020/07/08 13:00:00",
          lat: 35.6345235,
          lng: 128.4240615,
          name: "틀린손약국",
          remain_stat:"break",
          stock_at:"2020/07/08 13:00:00",
          type:"01"
        },{
          addr: "대구광역시 달성군 구지면 구지리 174",
          code: "4",
          created_at:"2020/07/08 13:00:00",
          lat: 35.6645235,
          lng: 128.4140615,
          name: "기름손약국",
          remain_stat:"plenty",
          stock_at:"2020/07/08 13:00:00",
          type:"01"
        },{
          addr: "대구광역시 달성군 구지면 구지리 172",
          code: "5",
          created_at:"2020/07/08 13:00:00",
          lat: 35.6625235,
          lng: 128.4220615,
          name: "다름손약국",
          remain_stat:"plenty",
          stock_at:"2020/07/08 13:00:00",
          type:"01"
        },{
          addr: "대구광역시 달성군 구지면 구지리 172",
          code: "6",
          created_at:"2020/07/08 13:00:00",
          lat: 35.6522235,
          lng: 128.4334615,
          name: "구지구약국",
          remain_stat:"empty",
          stock_at:"2020/07/08 13:00:00",
          type:"01"
        },{
          addr: "대구광역시 달성군 구지면 구지리 172",
          code: "7",
          created_at:"2020/07/08 13:00:00",
          lat: 35.6642735,
          lng: 128.4146615,
          name: "구지다른약국",
          remain_stat:"break",
          stock_at:"2020/07/08 13:00:00",
          type:"01"
        },{
          addr: "대구광역시 달성군 구지면 구지리 172",
          code: "8",
          created_at:"2020/07/08 13:00:00",
          lat: 35.6537835,
          lng: 128.4189615,
          name: "파란하늘약국",
          remain_stat:"few",
          stock_at:"2020/07/08 13:00:00",
          type:"01"
        },{
          addr: "대구광역시 달성군 구지면 구지리 172",
          code: "9",
          created_at:"2020/07/08 13:00:00",
          lat: 35.6612335,
          lng: 128.4245615,
          name: "하늘소약국",
          remain_stat:"some",
          stock_at:"2020/07/08 13:00:00",
          type:"01"
        },{
          addr: "대구광역시 달성군 구지면 구지리 172",
          code: "10",
          created_at:"2020/07/08 13:00:00",
          lat: 35.6611235,
          lng: 128.4225715,
          name: "대구소프트웨어약국",
          remain_stat:"plenty",
          stock_at:"2020/07/08 13:00:00",
          type:"01"
        }]
      }

      return examData;
      // return data.data;
    }catch(err){
     return null; 
    }
  }
}