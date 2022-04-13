const { gql } = require('@apollo/client');

export const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

export const getAuthorQuery = gql`
  {
    authors {
      id
      name
      age
    }
  }
`;

export const addBookMutation = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const getBookQuery = gql`
  query ($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      authorId {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
