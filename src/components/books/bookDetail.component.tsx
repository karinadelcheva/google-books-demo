import { useLocation } from "react-router-dom";
import Annotations from "../annotations/annotations.component";

export default function BookDetail(props: any) {
  const location = useLocation();

  const book = location.state.book;
  // let [book, setBook] = useState(null);
  // let booksRepo = new BooksRepository();
  // booksRepo.getStructuredBooks(params.bookId!)
  //   .then(result => {
  //     let book = result.filter((item: Book) => { return item.id === params.bookId })
  //     setBook(book);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
    
  if (book) {
    return (
      
      <div>
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
      </div>
    )
  } else {
    return null;
  }

  
}
