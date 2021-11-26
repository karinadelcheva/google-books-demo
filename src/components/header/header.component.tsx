export function Header() {
  function reload() {
    // window.location.reload();
  }

  return (
    <header className="App-header">
      <button onClick={reload} className="btn btn-dark btn-purple reload-button"> Reload </button>
    </header>
  )
}