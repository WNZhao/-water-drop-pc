import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from './constants';
import { currentOrg } from '.';


// 类似每次请求带这个token
const httpLink = createHttpLink({
  uri: '//localhost:3000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN)

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      orgId: currentOrg()?.value || ''
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: 'http://localhost:3000/graphql',
  // uri: 'http://localhost:8888/graphql',
  cache: new InMemoryCache({ addTypename: false }), // 不在返回的数据中加入__typename
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});
