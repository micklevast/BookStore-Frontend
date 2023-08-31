import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/UpdateBook.css';

const UpdateBook = ({ book, onClose }) => {
  const [updatedTitle, setUpdatedTitle] = useState(book.title);
  const [updatedAuthor, setUpdatedAuthor] = useState(book.author);
  const [updatedPublishedYear, setUpdatedPublishedYear] = useState(book.publishedYear);
  const [updateMessage, setUpdateMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const renderBackendURL = "https://harekrishna.onrender.com"; // Your backend URL
  // const renderBackendURL = "http://localhost:5000";

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${renderBackendURL}/books/update/${book._id}`, {
        title: updatedTitle,
        author: updatedAuthor,
        publishedYear: updatedPublishedYear,
      });

      console.log('Book updated:', response.data);
      setUpdateMessage('');
      setSuccessMessage('Book updated successfully.');
      onClose(); // Close the update form
    } catch (error) {
      console.error('Updating book failed:', error);
      setUpdateMessage('Failed to update book. Please try again.' + `${renderBackendURL}/books/update/${book._id}`);
      setSuccessMessage('');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${renderBackendURL}/books/delete/${book._id}`);
      console.log('Book deleted:', book._id);
      setSuccessMessage('Book deleted successfully.');
      onClose(); // Close the update form
    } catch (error) {
      console.error('Deleting book failed:', error);
      setUpdateMessage('Failed to delete book. Please try again.' + `${renderBackendURL}/books/delete/${book._id}`);
      setSuccessMessage('');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [successMessage]);

  return (
    <>
      <h3 className="update-book-title">Update Book</h3>
    <div className="update-book-form">
      <div className="success-message">{successMessage}</div>
      <input
        className="update-book-input"
        type="text"
        placeholder="Title"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <input
        className="update-book-input"
        type="text"
        placeholder="Author"
        value={updatedAuthor}
        onChange={(e) => setUpdatedAuthor(e.target.value)}
      />
      <input
        className="update-book-input"
        type="number"
        placeholder="Published Year"
        value={updatedPublishedYear}
        onChange={(e) => setUpdatedPublishedYear(e.target.value)}
      />
      <div className="update-buttons-container">
        <button className="update-button" onClick={handleUpdate}>Update</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
      {updateMessage && <p className="update-message error">{updateMessage}</p>}
    </div>
    </>
  );
};

export default UpdateBook;
