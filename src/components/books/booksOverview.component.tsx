import { Book } from "../../models/book";
import { sliderSettings } from "../../models/constants";
import { Annotation } from "../../repo/annotations.repository";
import Slider from "react-slick";

export default function BooksOverview(props: { books: Book[], annotations: Annotation[] }) {
  let settings = sliderSettings;
  return (


    <div className="slider-container container">
      <Slider {...settings}>

        {props.books.map((book: Book) => (
          <div className="book" key={book.id} data-index={book.id}>
            <div className="book-card" >
              <div className="row">
                <div className="col-4">
                  <img className="book-thumbnail" src={`${book.thumbnail}`} alt={book.title} />
                  <form action={book.selfLink}>
                    <button className="btn btn-dark btn-purple book-link " type="submit"  >See more</button>
                  </form>
                </div>

                <div className="col-1"></div>
                <div className="col-7" >

                  <h3>{book.title}</h3>
                  <h5>{book.authors}</h5>

                </div>
              </div>
            </div>

          </div>
        ))}
      </Slider>
    </div>
  )
}