import User from './models/User';
import Board from './models/Board';
import Comment from './models/Comment';
import Recomment from './models/Recomment';

type User = {
  input: {
    name: string,
    email: string,
    gender: string,
    phoneNumber: string,
    password: string,
  }
}

type Board = {
  input: {
    title: string,
    content: string,
    author: string,
    comment?: [string],
  }
}

type Comment = {
  input: {
    content: string,
    author: string,
    recmomment?: string,
  }
}

type Recomment = {
  input: {
    content: string,
    author: string,
    comment: string,
  }
}

type ID = {
  _id: string,
}

const resolvers = {
  Query: {
    async Users(_:void, args:void) {
      try{
        return await User.find();
      } catch(err){
        console.error(err);
      }
    },
    async Boards(_:void, args:void) {
      try{
        return await Board.find();
      } catch(err){
        console.error(err);
      }
    },
    async BoardById(_:void, args:ID){
      try{
        return await Board.find({author: args._id});
      }catch(err){
        console.error(err);
      }
    },
    async Comments(_:void, args:ID) {
      try{
        return await Comment.find().where('board').equals(args._id);
      } catch(err){
        console.error(err);
      }
    },
    async Recomments(_:void, args:ID) {
      try{
        return await Recomment.find().where('comment').equals(args._id);
      } catch(err){
        console.error(err);
      }
    },
    async User(_:void, args:ID){
      try{
        return await User.findById(args._id);
      }catch(err){
        console.error(err);
      }
    },
    async Board(_:void, args:ID){
      try{
        return await Board.findById(args._id);
      }catch(err){
        console.error(err);
      }
    }
  },
  Mutation: {
    async createUser(_:void, args:User) {
      try{
        return await User.create(args.input);
      } catch(err){
        console.error(err);
      }
    },

    async createBoard(_:void, args:Board){
      try{
        const data = await Board.create(args.input);
        await User.findByIdAndUpdate(args.input.author, {$push: {"boards": data._id}},{ 'new': true});

        return data;
      } catch(err){
        console.error(err);
      }
    },

    async createComment(_:void, args:Comment){
      try {
        const data = await Comment.create(args.input);
        await Board.findByIdAndUpdate(args.input.author,{$push:{"comments":data._id}});

        return data;
      } catch (err) {
        console.error(err);
      }
    },

    async createRecomment(_:void, args:Recomment){
      try {
        const data = await Recomment.create(args.input);
        await Comment.findByIdAndUpdate(args.input.author,{$push:{"recommnts":data._id}});

        return data;
      } catch (err) {
        console.error(err);
      }
    },

    async deleteUser(_:void, args:ID){
      try {
        await User.findByIdAndRemove(args._id);
        await Board.findByIdAndDelete(args._id);

        return true;
      } catch (err) {
        console.error(err);
      }
      return false;
    },

    async deleteBoard(_:void, args:ID){
      try {
        await Board.findByIdAndRemove(args._id);
        await Comment.findByIdAndDelete(args._id);

        return true;
      } catch (err) {
        console.error(err);
      }
      return false;
    },

    async deleteComment(_:void, args:ID){
      try {
        await Comment.findByIdAndRemove(args._id);
        await Board.findByIdAndDelete(args._id);

        return true;
      } catch (err) {
        console.error(err);
      }
      return false;
    },

    async deleteRecomment(_:void, args:ID){
      try {
        await Recomment.findByIdAndRemove(args._id);

        return true;
      } catch (err) {
        console.error(err);
      }
      return false;
    },

    async updateUser(_:void, args:ID & User){
      try {
        await User.findByIdAndUpdate(args._id, args.input);

        return true;
      } catch (err) {
        console.error(err);
      }
      return false;
    },
    async updateBoard(_:void, args:ID & Board){
      try {
        await Board.findByIdAndUpdate(args._id, args.input);
        
        return true;
      } catch (err) {
        console.error(err);
      }
      return false;
    },
    async updateComment(_:void, args:ID & Comment){
      try {
        await Comment.findByIdAndUpdate(args._id, args.input);

        return true;
      } catch (err) {
        console.error(err);
      }
      return false;
    },
    async updateRecomment(_:void, args:ID & Recomment){
      try {
        await Recomment.findByIdAndUpdate(args._id, args.input);
        return true;
      } catch (err) {
        console.error(err);
      }
      return false;
    },


    // async deleteUser
    // async updateUser
  }
};

export default resolvers;