// import { ApolloClient, HttpLink, InMemoryCache} from 'apollo-client-preset';
import {ApolloLink, from} from 'apollo-link';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';

const API = new HttpLink({
  uri: 'http://10.80.162.77:8000/graphql'
});

const cache = new InMemoryCache();

const afterWareLink = onError(({operation, response, graphQLErrors = {}, networkError = {} as any}) => {
  const status: number = networkError && networkError.statusCode ? networkError.statusCode : null;
    console.log(operation);
    console.log(response);
    console.log(graphQLErrors);
    console.log(status);
});


// const client = new ApolloClient({
//   link: new HttpLink(
//     { uri: 'http://10.80.162.77:8000/graphql'
//   }),
//   cache: new InMemoryCache(),
// });

export const apolloClient = new ApolloClient({
  link: from([
    afterWareLink,
    API
  ]),
  cache: cache,
});