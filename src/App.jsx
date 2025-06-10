import pokemon_data from "./utils/data"

const App = () => {

  const columns = ['number', 'name', 'types']

  const pokemon = pokemon_data

  let page = 0
  const pageLength = 10
  const totalPages = Math.ceil(pokemon.length / pageLength)

  const getPage = (page, pageLength) => {
    const itemFirst = page * pageLength
    const itemLast = itemFirst + pageLength
    return pokemon.slice(itemFirst, itemLast)
  }


  return (
    <>
      <h1>Pokedex</h1>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th key={column}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {getPage(page, pageLength).map((pokemon) => {
            return (
              <tr key={pokemon.number}>
                {columns.map((column) => {
                  return (
                    <td key={column}>{pokemon[column]}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <p>{`Page ${page + 1} of ${totalPages}`}</p>
      <button>Prev</button>
      <button>Next</button>
    </>
  )
}

export default App
