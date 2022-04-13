import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../../Utils/Queries';
import BookDetails from '../BookDetails/BookDetails';

const BookList = () => {
  const { loading, data } = useQuery(getBooksQuery);
  const [id, setId] = useState();

  const getBookData = id => setId(id);

  const displayBooks = loading ? (
    <div>Loading Books...</div>
  ) : (
    data?.books.map(cur => (
      <li key={cur.id} onClick={() => getBookData(cur.id)}>
        {cur.name}
      </li>
    ))
  );

  return (
    <div>
      <ul id="book-list">{displayBooks}</ul>
      <BookDetails bookId={id} />
    </div>
  );
};

export default BookList;
