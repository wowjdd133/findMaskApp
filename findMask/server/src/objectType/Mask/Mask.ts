import { ObjectType, Field } from "type-graphql";
import { Store } from "../../types/Masks";
import { StoreClass } from "./Store";

@ObjectType()
export default class MaskObject{
  @Field(() => Number)
  count:number;
  @Field(() => [StoreClass],{nullable:true})
  stores?:Store[];
}