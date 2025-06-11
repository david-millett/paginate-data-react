import { useState } from "react"
import pokemon_data from "./utils/data"

const App = () => {

  // Variables
  const columns = ['number', 'name', 'types']
  const pokemon = pokemon_data
  
  const [page, setPage] = useState(0)
  const [pageLength, setPageLength] = useState(10)

  const pageLast = Math.ceil(pokemon.length / pageLength)

  // Function to generate an array of all pages
  const getPageNumbers = (pageFirst, pageLast) => {
    return Array.from({ length: pageLast - pageFirst}, (_, i) => pageFirst + i)
  }
  const pages = getPageNumbers(0, pageLast)

  // Function to isolate the data required for the current page
  const getPage = (page, pageLength) => {
    const itemFirst = page * pageLength
    const itemLast = (page + 1) * pageLength
    return {
      data: pokemon.slice(itemFirst, itemLast),
      first: itemFirst,
      last: itemLast
    }
  }
  const currentPage = getPage(page, pageLength)

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
    </>
  )
}

export default App
