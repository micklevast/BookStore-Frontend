import React, { useState } from 'react';
import './css/Addingbook.css';
import axios from 'axios';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const renderBackendURL = "https://harekrishna.onrender.com";
  // const renderBackendURL = "http://localhost:5000";

  const handleAddBook = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await axios.post(`${renderBackendURL}/books/add`, {
        title: title,
        author: author,
        publishedYear: parseInt(publishedYear),
      });
      console.log('New book added:', response.data);
      // You can perform additional actions after successful addition
      setTitle('');
      setAuthor('');
      setPublishedYear('');
    } catch (error) {
      console.error('Adding new book failed:', error);
      // Handle error, show an error message, etc.
    }
  };

  const isFormEmpty = (!title && !author && !publishedYear);

  return (
    <div className="add-book-container">
      <h2 className="add-book-title">Add a New Book</h2>
      <form className="add-book-form" onSubmit={handleAddBook}>
        <input
          className="add-book-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="add-book-input"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          className="add-book-input"
          type="number"
          placeholder="Published Year"
          value={publishedYear}
          onChange={(e) => setPublishedYear(e.target.value)}
        />
        <button
          className="add-book-button"
          type="submit"
          onClick={handleAddBook}
          disabled={isFormEmpty} // Disable the button if the form is empty
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
