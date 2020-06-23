import { AuthChecker } from 'type-graphql';
import { ApolloContextInterface } from '../context/ApolloContext';
import { ApolloError } from 'apollo-server-express';

export const ApolloAuthChecker: AuthChecker<ApolloContextInterface> = async ({context: {jwt,invalidToken, user}}, roles) => {
  if(invalidToken){
    throw new ApolloError(invalidToken.message, invalidToken.name);
  }
  if(!user){
    return false;
  }
  return true;
}