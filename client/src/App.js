import BookList from './components/BookList/BookList';
import { ApolloProvider } from '@apollo/client';
import client from './Utils/ApolloClient';
import AddBook from './components/AddBook/AddBook';

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ishaan's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
