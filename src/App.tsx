import React from 'react';
import './App.scss';
import BooksOverview from './components/books/booksOverview.component';
import { Header } from './components/header/header.component';
import { Search } from './components/search/search.component';
import { Book } from './models/book';
import { Annotation, AnnotationsRepository } from './repo/annotations.repository';

export interface AppState {
  books: Book[],
  annotations: Annotation[]
}
export default class App extends React.Component<{}, AppState> {
  state: AppState = {
    books: [],
    annotations: []
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
        <BooksOverview books={this.state.books} annotations={this.state.annotations}/>
    }
    return (
      <div className="App">
        <Header />
        <Search parentCallback={this.handleCallback} />
        <div className='error' id='error'></div>
        {this.booksRender}
      </div>
    );
  }
}

