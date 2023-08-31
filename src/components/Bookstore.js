import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Authentication from './Authentication';
import BookList from './BookList';

export default function Bookstore() {
  const [token, setToken] = useState('');
  const [books, setBooks] = useState([]);
  const [loginUserName,setLoginUsername]=useState("default")
  const renderBackendURL="https://harekrishna.onrender.com";
  // const renderBackendURL = "http://localhost:5000";

  useEffect(() => {
    // Check for existing token in cookies and setToken
    const existingToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (existingToken) {
      setToken(existingToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchBooks();
    }
  }, [token,books]);

  const fetchBooks = () => {
    axios.get(`${renderBackendURL}/books`)
      .then(response => {
        const filteredBooks = response.data.filter(book => (
          book.title !== '' && book.author !== '' && book.publishedYear !== 0
        ));
        setBooks(filteredBooks);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  };
  



  return (
    <div className="App">
      {token ? (
        <div>
          {/* Bookstore content when authenticated */}

          <BookList fetchBooks={fetchBooks} books={books} loginUserName={loginUserName} setToken={setToken}/>
        </div>
      ) : (
        <div>
          {/* Authentication forms */}
          <Authentication setToken={setToken} setLoginUsername={setLoginUsername} />
        </div>
      )}
    </div>
  );
}