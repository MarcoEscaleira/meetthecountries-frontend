import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      console.error(graphQLErrors);
      console.error(networkError);
    }),
    new HttpLink({
      uri: __API_SERVICE__,
      credentials: "include",
    }),
  ]),
  cache,
});
