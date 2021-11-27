import book from '../../assets/img/book.png'
export function Header() {

  return (
    <header className="App-header">
      <div className="title-container">
        <span> React Google Books App</span>
        <img className="book-icon" src={book} alt="book icon" />
      </div>
    </header>
  )
}