import BookList from "./components/BookList";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>My Book List</h1>
          <BookList />
          <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
