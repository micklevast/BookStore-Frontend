import React, { useState } from 'react';
import './css/Addingbook.css';
import axios from 'axios';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const renderBackendURL="https://harekrishna.onrender.com";

  const handleAddBook = async () => {
    try {
      const response = await axios.post(`${renderBackendURL}/books/add`, {
        title: title,
        author: author,
        publishedYear: parseInt(publishedYear),
      });
      console.log('New book added:', response.data);
      // You can perform additional actions after successful addition
      setTitle("");
      setAuthor("");
      setPublishedYear("");
    } catch (error) {
      console.error('Adding new book failed:', error);
      // Handle error, show an error message, etc.
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="number"
        placeholder="Published Year"
        value={publishedYear}
        onChange={(e) => setPublishedYear(e.target.value)}
      />
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default AddBook;
