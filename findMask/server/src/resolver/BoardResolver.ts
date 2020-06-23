import { Board } from "../entity/Board";
import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from "type-graphql";
import { User } from "../entity/User";
import { ApolloContextInterface } from "../context/ApolloContext";
import { ApolloError } from "apollo-server-express";

@Resolver(Board)
export class BoardResolver {
  
  @Query((returns) => [Board])
  async boards() {
    return await Board.find();
  }

  @Query((retruns) => Board)
  async board(@Arg("id") id: string) {
    return await Board.find({ where: { id: id } });
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteBoard(
    @Ctx() apolloContext: ApolloContextInterface,
    @Arg("id") id: string,
  )
  {
    try{
      const BoardData = await Board.findOne({id: id});

      if(BoardData){
        console.log(BoardData);
        if(BoardData.uid.id === apolloContext.user.id){
          BoardData.remove();
  
          return true;
        }
        throw new ApolloError("You have no authority")
      }
  
      throw new ApolloError("invalid Board");
    }catch(err){
      console.error(err);
      return false;
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async updateBoard(
    @Arg('id') id:string,
    @Arg('title') title: string,
    @Arg('content') content:string,
    @Ctx() {user}: ApolloContextInterface,
  )
  { 
    try{
      const BoardData = await Board.findOne({id});

      if(BoardData){
        if(BoardData.uid.id === user.id){
          await Board.update({id: id}, {title: title, content: content});

          return true;
        }
        throw new ApolloError("권한 없음.");
      }
      throw new ApolloError("invalid Board");
    }catch(err){
      console.error(err);
      return false;
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async writeBoard(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Ctx() apolloContext: ApolloContextInterface,
  ) {
    try {
      const user = apolloContext.user;

      if(!user){
        throw new ApolloError("invalid token");
      }
      
      await Board.create({
        title,
        uid: user,
        content,
      }).save();

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
