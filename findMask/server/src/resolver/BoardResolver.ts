import { Board } from "../entity/Board";
import { Resolver, Query, Arg, Mutation, Authorized, Ctx, ID } from "type-graphql";
import { User } from "../entity/User";
import { ApolloContextInterface } from "../context/ApolloContext";
import { ApolloError } from "apollo-server-express";

@Resolver(() => Board)
export class BoardResolver {

  @Query((returns) => [Board])
  async boards() {
    return await Board.find();
  }

  @Query((retruns) => Board)
  async board(@Arg("id") id: string) {
    console.log(id);
    const data = await Board.findOne({where:{id: id}, relations: ['comments']});
    if(data){
      return data;
    }
    throw new ApolloError("not found board");
  }

  @Mutation(() => Boolean)
  async upViewCount(
    @Arg("id") id:string 
  )
  {
    const BoardData = await Board.findOne({id: id});

    if(BoardData){
      BoardData.viewCount += 1;
      BoardData.save();

      return true;
    }

    return false;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteBoard(
    @Ctx() {user}: ApolloContextInterface,
    @Arg("id") id: string,
  )
  {
    try{

      if(!user){
        throw new ApolloError("invalid token");
      }

      const BoardData = await Board.findOne({id: id});

      if(BoardData){
        console.log(BoardData);
        if(BoardData.uid.id === user.id){
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

      if(!user){
        throw new ApolloError("invalid token");
      }

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
  @Mutation(() => ID)
  async writeBoard(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Ctx() apolloContext: ApolloContextInterface,
  ) {
    try {
      const user = apolloContext.user;

      console.log(user);

      if(!user){
        throw new ApolloError("invalid token");
      }
      
      const board = await Board.create({
        title,
        uid: user,
        content,
      }).save();

      return board.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
