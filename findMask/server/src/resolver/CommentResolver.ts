import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from "type-graphql";
import { Comment } from "../entity/Comment";
import { ApolloContextInterface } from "../context/ApolloContext";
import { ApolloError } from "apollo-server-express";
import { Board } from "../entity/Board";

@Resolver(Comment)
export class CommentResolver {
  @Query(returns => [Comment])
  async comments(
    @Arg('bid') bid: string
  ){
    return await Comment.find({where: {bid: bid}});
  }

  @Authorized()
  @Mutation(() => Boolean)
  async updateComment(
    @Arg('id') id: string,
    @Arg('content') content: string,
    @Ctx() {user}: ApolloContextInterface,
  )
  { 
    try{

      const comment = await Comment.findOne({where: {id: id}});

      if(!comment){
        throw new ApolloError("invalid comment");
      }

      if(!user){
        throw new ApolloError("invalid token");
      }

      if(content){
        await Comment.update({id: id}, {content: content});
        return true;
      }
      throw new ApolloError("invalid parameters")
    }catch(err){
      console.error(err);
      return false;
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteComment(
    @Arg('id') id: string,
    @Ctx() {user}: ApolloContextInterface
  )
  {
    try{
      if(!user){
        throw new ApolloError("invalid token");
      }

      if(!id){
        throw new ApolloError("wrong params")
      }

      const comment = await Comment.findOne({where:{id: id}});

      if(!comment){
        throw new ApolloError("comment not found");
      }

      await comment.remove();

      return true;
    }catch(err){
      console.error(err);
      return false;
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async writeComment(
    @Arg('bid') bid: string,
    @Arg('content') content: string,
    @Ctx() {user}: ApolloContextInterface,
  )
  {
    try{
      if(!user){
        throw new ApolloError("invalid token");
      }

      const board = await Board.findOne({id: bid});

      if(!board){
        throw new ApolloError("invalid board");
      }

      await Comment.create({
        bid: board,
        content: content,
        author: user
      });

    }catch(err){
      console.error(err);
      return false;
    }
  }
}
