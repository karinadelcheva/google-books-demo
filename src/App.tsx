import React from 'react';
import './App.scss';
import BooksOverview from './components/books/booksOverview.component';
import { Header } from './components/header/header.component';
import { Search } from './components/search/search.component';
import { Book } from './models/book';
import { Annotation, AnnotationsRepository } from './repo/annotations.repository';
import { Routes, Route } from "react-router-dom";
import BookDetail from './components/books/bookDetail.component';
export interface AppState {
  books: Book[],
  annotations: Annotation[],
  backgroundLocation: any,
}


function Layout(props: any) {
  return (
    <div>
      <Header />
      <div className='error' id='error'></div>
    </div>
  )
}
export default class App extends React.Component<{}, AppState> {

  state: AppState = {
    books: [],
    annotations: [],
    backgroundLocation: undefined
  }
  booksRender = <div></div>
  public repository = new AnnotationsRepository();

  constructor(props: {}) {
    super(props);
    this.repository.getFromApi().then((result: Annotation[]) => {
      this.state.annotations = result;
    });
  }

  handleCallback = (books: Book[] = []) => {
    this.setState({ books: books })
  }


  render() {
    if (this.state.books && this.state.books.length) {
      this.booksRender =
        <BooksOverview books={this.state.books} annotations={this.state.annotations} />
    }
    return (
      <div className="App">
        < Layout />
        < Search parentCallback={this.handleCallback} /> 
        <Routes location={this.state?.backgroundLocation}>
          <Route path="/" element={this.booksRender} />
          <Route path="books/:bookId" element={<BookDetail />} />
        </Routes>

        
      </div>
    );
  }
}

// {/* Show the modal when a `backgroundLocation` is set */}
// {this.state?.backgroundLocation && (
//   <Routes>
//     <Route path="/img/:id" element={<BookDetail />} />
//   </Routes>
// )}

