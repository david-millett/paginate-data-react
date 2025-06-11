import { useState } from "react"
import pokemon_data from "./utils/data"

const App = () => {

  const columns = ['number', 'name', 'types']
  const pokemon = pokemon_data
  
  const [page, setPage] = useState(0)
  const pageLength = 10
  const pageLast = Math.ceil(pokemon.length / pageLength)

  const getPage = (page, pageLength) => {
    const itemFirst = page * pageLength
    const itemLast = itemFirst + pageLength
    return {
      data: pokemon.slice(itemFirst, itemLast),
      first: itemFirst,
      last: itemLast
    }
  }

  const currentPage = getPage(page, pageLength)

  return (
    <>
      <h1>Pokedex</h1>

      <button disabled={page === 0} onClick={() => setPage(0)}>First</button>
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
      <button disabled={page === pageLast - 1} onClick={() => setPage(page + 1)}>Next</button>
      <button disabled={page === pageLast - 1} onClick={() => setPage(pageLast - 1)}>Last</button>

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
          {currentPage.data.map((pokemon) => {
            return (
              <tr key={pokemon.number}>
                {columns.map((column) => {
                  return (
                    <td key={column}>{column != 'types' ? pokemon[column] : pokemon[column].join(' / ')}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <p>{`Showing ${currentPage.first + 1}-${currentPage.last} of ${pokemon.length}`}</p>
      <p>{`Page ${page + 1} of ${pageLast}`}</p>
    </>
  )
}

export default App
