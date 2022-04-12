const { useQuery } = require('@apollo/client');
const { getAuthorQuery } = require('../../Utils/Queries');

const AddBook = () => {
  const { loading, data } = useQuery(getAuthorQuery);

  const displayAuthors = loading ? (
    <option disabled>Loading Authors...</option>
  ) : (
    data?.authors.map(cur => (
      <option key={cur.id} value={cur.id}>
        {cur.name}
      </option>
    ))
  );

  return (
    <form id="addBook">
      <div className="field">
        <label>Book Name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select Author</option>
          {displayAuthors}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
