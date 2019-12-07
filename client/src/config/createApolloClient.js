import ApolloClient from 'apollo-boost';

export const serverLink = 'http://localhost:4002/graphql'
const client = new ApolloClient({
  uri: serverLink,
});


export default client