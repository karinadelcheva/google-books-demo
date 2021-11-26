import React from 'react';
import './App.scss';

import { Header } from './components/header/header.component';
import { Search } from './components/search/search.component';
import { Book } from './models/book';

export default class App extends React.Component {
  state = {
    books: [],
  }
  booksRender = <div></div>
  handleCallback = (books: Book[]) => {
    this.setState({ books: books })
  }

  render() {

    if (this.state.books && this.state.books.length) {
      this.booksRender =
        <div className='container' >
          {this.state.books.map((book: Book) => (
            <div className="book" key={book.id} data-index={book.id}>
              <div className="book-card" >
                <div className="row">
                  <div className="col-3">
                    <img src={`${book.thumbnail}`} alt={book.title} />
                  </div>
                  <div className="col-8" >

                    <h2>{book.title}</h2>
                    <h3>{book.authors}</h3>
                    <p className="book-description">{book.description}...</p>

                  </div>
                </div>
                
              </div>
              <form action={book.selfLink}>
                  <button className="btn btn-dark btn-purple " type="submit"  >Go to Google</button>
                </form>
            </div>
          ))}
        </div>
    }
    return (
      <div className="App">
        <Header />
        <Search parentCallback={this.handleCallback} />
        {this.booksRender}
        <div className='error' id='error'></div>
      </div>
    );
  }
}

