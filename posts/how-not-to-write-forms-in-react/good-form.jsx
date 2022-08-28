function App() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.target.elements['username'].value
    alert(`Ok, ${username}, I sent your data to our server ✨`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        What's your name?
        <input name="username" placeholder="Enter your name..." />
      </label>

      <button>Submit</button>
    </form>
  )
}
