import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

const removeTypenameLink = removeTypenameFromVariables();

const cache = new InMemoryCache({
  addTypename: false,
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    removeTypenameLink,
    new HttpLink({
      uri: __API_SERVICE__,
      credentials: "include",
      fetchOptions: {
        timeout: 5000,
      },
    }),
  ]),
  cache,
});
