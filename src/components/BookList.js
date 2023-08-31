import React, { Fragment, useState } from 'react';
import './css/bookList.css';
import './css/Addingbook.css';
import AddBook from './AddBook';
import UpdateBook from './UpdateBook'; // Import the UpdateBook component
import axios from 'axios'; // Import axios for API calls

export default function BookList({fetchBooks, books, loginUserName, setToken }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const renderBackendURL = "https://harekrishna.onrender.com"; // Your backend URL
  // const renderBackendURL = "http://localhost:5000";

  const handleUpdateClick = async (book) => {
    setSelectedBook(book);
  };

  const handleUpdateClose = () => {
    setSelectedBook(null);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`${renderBackendURL}/books/delete/${bookId}`);
      console.log('Book deleted:', bookId);
      fetchBooks();
      // You can perform additional actions after successful deletion
    } catch (error) {
      console.error('Deleting book failed:', error);
      // Handle error, show an error message, etc.
    }
  };

  return (
    <Fragment>
      <div className='userInfo'>
        <h2 className='login-welcome'>Welcome {loginUserName}</h2>
        <button className='signout-button' onClick={() => { setToken("") }}>SignOut</button>
      </div>
      <div className='book-list'>
        <AddBook />
        <h2>Book List</h2>
        <table className='book-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published Year</th>
              <th>Actions</th> {/* Add column for actions */}
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id} className='book-item'>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishedYear}</td>
                <td>
                  <button className='update-button' onClick={() => handleUpdateClick(book)}>U</button>
                  <button className='delete-button' onClick={() => handleDelete(book._id)}>D</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedBook && (
          <UpdateBook book={selectedBook} onClose={handleUpdateClose} />
        )}
      </div>
    </Fragment>
  );
}
