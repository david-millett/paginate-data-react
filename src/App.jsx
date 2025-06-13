import { useState } from "react"
import pokemon_data from "./utils/data"
import { getPage } from "./utils/getPage"
import { getPageNumbers } from "./utils/getPageNumbers"
import { getTypes } from "./utils/getTypes"

const App = () => {

  // Variables
  const columns = ['number', 'name', 'types']
  const pokemon = pokemon_data
  
  const [page, setPage] = useState(0)
  const [pageLength, setPageLength] = useState(10)
  // const [results, setResults] = useState(pokemon)

  const pageLast = Math.ceil(pokemon.length / pageLength)
  const pages = getPageNumbers(0, pageLast)
  const currentPage = getPage(page, pageLength, pokemon)
  const types = getTypes(pokemon)

  // Function to change number of items per page and reset page to the beginning
  const changePageLength = (e) => {
    setPageLength(e.target.value)
    setPage(0)
  }

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

      <p>{`Showing ${currentPage.first + 1}-${Math.min(currentPage.last, pokemon.length)} of ${pokemon.length}`}</p>
      
      <div className="flex">
        <p>Page</p>
        <select id="page" name="page" value={page + 1} onChange={(e) => {setPage(e.target.value - 1)}}>
          {pages.map((pg) => {
            return <option value={pg + 1}>{pg + 1}</option>
          })}
        </select>
        <p>{`of ${pageLast}`}</p>
      </div>
      
      <div className="flex">
        <select id="pageLength" name="pageLength" value={pageLength} onChange={changePageLength}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <p>pokemon per page</p>
      </div>

      <p>Filter by type:</p>
      <select id="types" name="types">
        <option disabled>Select a type</option>
        {types.map((type) => {
          return <option value={type}>{type}</option>
        })}
      </select>
    </>
  )
}

export default App
