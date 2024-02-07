import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    new HttpLink({
      uri: __API_SERVICE__,
      credentials: "include",
    }),
  ]),
  cache,
});
