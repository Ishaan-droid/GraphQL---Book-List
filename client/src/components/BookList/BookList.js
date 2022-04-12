import { useQuery } from '@apollo/client';

import { getBooksQuery } from '../../Utils/Queries';

const BookList = () => {
  const { loading, data } = useQuery(getBooksQuery);

  let displayBooks = loading ? (
    <div>Loading Books...</div>
  ) : (
    data?.books.map(cur => <li key={cur.id}>{cur.name}</li>)
  );

  return (
    <div>
      <ul id="book-list">{displayBooks}</ul>
    </div>
  );
};

export default BookList;
