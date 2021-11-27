import { Book } from "../../models/book";
import { Annotation } from "../../repo/annotations.repository";
import Annotations from "../annotations/annotations.component";

export default function BookDetail(props: {book: Book, annotations: Annotation[]}) {
  let book = props.book;
  return (
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
      < Annotations annotations={props.annotations.filter(annotation => { return annotation.bookId === book.id })} />
      <form action={book.selfLink}>
        <button className="btn btn-dark btn-purple " type="submit"  >Go to Google</button>
      </form>
    </div>
  )
}

