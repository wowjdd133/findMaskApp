import jsonwebtoken from 'jsonwebtoken';
import {User} from '../entity/User';
import 'dotenv/config';

const JWT_TOKEN_KEY = process.env.JWT_TOKEN;

export const ApolloContext = async ({req}):Promise<ApolloContextInterface> => {
  let user = undefined;
  let verified = undefined;
  let error = undefined

  if(req.headers.authorization){
    try{
      verified = await jsonwebtoken.verify(req.headers.authorization, JWT_TOKEN_KEY);
    }catch(err){
      error = err;
    }
  }
  if(verified){
    user = {
      ...verified
    }
  }

  return{
    jwt: jsonwebtoken,
    invalidToken: error,
    Authorization: req.headers.authorization,
    JWT_TOKEN_KEY: JWT_TOKEN_KEY,
    user: user
  }
}

export interface ApolloContextInterface {
  Authorization: string | undefined;
  jwt: any;
  user: User;
  JWT_TOKEN_KEY: string;
  invalidToken: Error;
}