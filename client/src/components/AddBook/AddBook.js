import { useState } from 'react';

const { useQuery, useMutation } = require('@apollo/client');
const { getAuthorQuery, addBookMutation, getBooksQuery } = require('../../Utils/Queries');

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

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

  const nameHandler = e =>
    setFormData(prevValue => {
      return {
        ...prevValue,
        name: e.target.value,
      };
    });

  const genreHandler = e =>
    setFormData(prevValue => {
      return {
        ...prevValue,
        genre: e.target.value,
      };
    });

  const authorHandler = e =>
    setFormData(prevValue => {
      return {
        ...prevValue,
        authorId: e.target.value,
      };
    });

  const [createBook] = useMutation(addBookMutation, {
    variables: {
      name: formData.name,
      genre: formData.genre,
      authorId: formData.authorId,
    },
    refetchQueries: [{ query: getBooksQuery }],
  });

  const submitForm = e => {
    e.preventDefault();
    createBook();
  };

  return (
    <form id="addBook" onSubmit={submitForm}>
      <div className="field">
        <label>Book Name:</label>
        <input type="text" onChange={nameHandler} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={genreHandler} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={authorHandler}>
          <option>Select Author</option>
          {displayAuthors}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
