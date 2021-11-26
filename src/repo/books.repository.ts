import { BaseRepository } from "./base.repository";
import { Book } from "../models/book";

export class BooksRepository extends BaseRepository {
  
  async getFromApi(queryParam: string): Promise<any >{
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${queryParam}`)
      .then(res => {
        return res;
      })
      .catch(e => {
      })
    
  }

  async getStructuredBooks(queryParam: string): Promise<any> {
    return this.getFromApi(queryParam)
    .then(async (response: any) => { 
      if (response.ok) {
        let result = await response.json();
        console.log(result)
        let booksFromAPI = result['items'];
        const books: Book[] = booksFromAPI.map((book: any) => {
          return new Book(
            book.id,
            book.selfLink,
            book.volumeInfo.title,
            book.volumeInfo.subtitle,
            book.volumeInfo.authors,
            book.volumeInfo.publisher,
            book.volumeInfo.publishedDate,
            book.volumeInfo.description,
            book.volumeInfo.imageLinks.thumbnail,
            book.volumeInfo.previewLink
          );
        });
        document.getElementById('error')!.innerHTML = ''

        return books;
      } else {
        document.getElementById('error')!.innerHTML = `<p class="error-message">Could not fetch.</p>`
      }
      
    })
    
  }
    
}