import { ApolloClient, HttpLink, InMemoryCache} from 'apollo-client-preset';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.35.17:8000/graphql'}),
  cache: new InMemoryCache(),
});

export default client;