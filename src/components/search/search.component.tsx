import { FormEvent, useState } from 'react';
import { BooksRepository } from '../../repo/books.repository';


export function Search(props: any) {
  const [query, setQuery] = useState('');

  async function getBooksFromApi(event: FormEvent, queryParam: string) {
    event.preventDefault()
    const repository = new BooksRepository();
    let response = await repository.getStructuredBooks(queryParam);
    console.log('response ', response)
    props.parentCallback(response)

    return response;

    
  }

  return (
    <div className="container search">
      <h1>Search here</h1>

      <form onSubmit={async (e)=>{ await getBooksFromApi(e, query)}}>
        <label className="search-label">
          <input onChange={(e) => setQuery(e.target.value)} type="text" className="search-input" name="name" id="searchParam" />
        </label>
        <input type="submit" className="btn btn-dark" id="searchButton" value="Search" />
      </form>
    </div>

  )
}