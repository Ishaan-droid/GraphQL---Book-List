import { useQuery } from '@apollo/client';
import { getBookQuery } from '../../Utils/Queries';

const BookDetails = ({ bookId }) => {
  const { data } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });

  const dispplayBookDetails = data?.book && (
    <div>
      <h2>{data.book.name}</h2>
      <p>{data.book.genre}</p>
      <p>{data.book.authorId.name}</p>
      <p>All books by this author:</p>
      <ul className="other-books">
        {data.book.authorId.books.map(cur => (
          <li key={cur.id}>{cur.name}</li>
        ))}
      </ul>
    </div>
  );

  return <div id="book-details">{dispplayBookDetails}</div>;
};

export default BookDetails;
