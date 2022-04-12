const { gql } = require('@apollo/client');

export const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
      authorId {
        name
        age
      }
    }
  }
`;
