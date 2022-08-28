function App() {
  const handleSubmit = (e) => {
    e.preventDefault()

    const name = e.target.elements.name.value
    const age = e.target.elements.age.valueAsNumber

    alert(
      JSON.stringify({
        name,
        age,
      })
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" />
      </label>

      <div />

      <label>
        Age:
        <input name="age" type="number" />
      </label>

      <div />

      <button>Submit</button>
    </form>
  )
}
