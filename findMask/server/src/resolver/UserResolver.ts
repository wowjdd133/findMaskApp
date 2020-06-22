import {User} from '../entity/User';
import {Resolver, Query, Arg, Mutation, Ctx} from 'type-graphql';
import bcrypt from 'bcrypt';
import Permission from '../types/Permission';
import {ApolloContextInterface} from '../context/ApolloContext';

@Resolver(User)
export class UserResolver {

  @Query(returns => [User])
  async users() :Promise<User[] | User | null>{
    return await User.find();
  }

  @Query(returns => User, { nullable: true, description: "Find One User"})
  async user(@Arg('id') id: string, @Ctx() apolloContext: ApolloContextInterface): Promise<User | null> {
    console.log(apolloContext);
    return await User.findOne({id});
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('phoneNumber') phoneNumber: string,
    @Arg('password') password: string,
    @Arg('permission') permission:Permission 
    ){
      try{

        const hashPassword = await bcrypt.hash(password,10)

        await User.create({
          email,
          password: hashPassword,
          phoneNumber,
          permission
        }).save();

        return true;
      }catch(err){
        console.log(err);
        return false;
      }
  }
}
