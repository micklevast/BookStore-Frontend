import React, { Fragment } from 'react';
import './css/bookList.css';
import './css/Addingbook.css';
import AddBook from './AddBook';

export default function BookList({ books,loginUserName,setToken }) {
  return (
      
<Fragment>
    <div className='userInfo'>
    <h2 className='login-welcome' >Welcome {loginUserName }</h2>
    <button className='signout-button' onClick={()=>{setToken("")}}  >SignOut</button>
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
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id} className='book-item'>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishedYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
</Fragment>


  );
}

