import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class StoreClass{
  @Field({nullable:true})
  addr: string
  @Field({nullable:true})
  code: string
  @Field({nullable:true})
  created_at: string
  @Field(() => Number,{nullable:true})
  lat: number
  @Field(() => Number,{nullable:true})
  lng: number
  @Field({nullable:true})
  name: string
  @Field({nullable:true})
  remain_stat: string
  @Field({nullable:true})
  stock_at: string
  @Field({nullable:true})
  type: string
}