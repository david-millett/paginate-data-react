import { useState } from "react"
import pokemon_data from "./utils/data"
import { getPage } from "./utils/getPage"
import { getPageNumbers } from "./utils/getPageNumbers"
import { getTypes } from "./utils/getTypes"

const App = () => {

  // Variables
  const columns = ['number', 'name', 'types']
  const allPokemon = pokemon_data
  const [pokemon, setPokemon] = useState(pokemon_data)
  const [page, setPage] = useState(0)
  const [pageLength, setPageLength] = useState(10)
  const pageLast = Math.ceil(pokemon.length / pageLength)
  const pages = getPageNumbers(0, pageLast)
  const currentPage = getPage(page, pageLength, pokemon)
  const types = getTypes(allPokemon)
  const [selectedType, setSelectedType] = useState('noType')

  // Function to change number of items per page and reset page to the beginning
  const changePageLength = (e) => {
    setPageLength(e.target.value)
    setPage(0)
  }

  // Functions to filter and set the pokemon data
  const changePokemonList = async (e) => {
    const filter = e.target.value
    const filteredList = []
    allPokemon.forEach((mon) => {
      if (mon.types.includes(filter)) {
        filteredList.push(mon)
      }
    })
    setSelectedType(filter)
    setPokemon(filteredList)
    setPage(0)
  }

  const removeFilter = () => {
    setPokemon(allPokemon)
    setSelectedType('noType')
    setPage(0)
  }

  return (
    <main>
      <h1>Pokedex</h1>

      <div className="flex">
        <button disabled={page === 0} onClick={() => setPage(0)}>&lt;&lt;</button>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>&lt;</button>
      
        <p>Page</p>
        <select id="page" name="page" value={page + 1} onChange={(e) => {setPage(e.target.value - 1)}}>
          {pages.map((pg) => {
            return <option value={pg + 1}>{pg + 1}</option>
          })}
        </select>
        <p>{`of ${pageLast}`}</p>
      
        <button disabled={page === pageLast - 1} onClick={() => setPage(page + 1)}>&gt;</button>
        <button disabled={page === pageLast - 1} onClick={() => setPage(pageLast - 1)}>&gt;&gt;</button>
      </div>

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
                  if (column === 'types') {
                    return <td key={column}>
                      <div className="flex">
                        {pokemon[column].map((type) => {
                          return <p className={`${type} type`}>{type}</p>
                        })}
                      </div>
                    </td>
                  } else {
                    return <td key={column}>{pokemon[column]}</td>
                  }
                  // return (
                    // <>
                      // <td key={column}>{column != 'types' ? pokemon[column] : pokemon[column].join(' / ')}</td>
                      // {column === 'types' ? <td key={column}>hey</td> : ''}
                    // </>
                  // )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <p>{`Showing ${currentPage.first + 1}-${Math.min(currentPage.last, pokemon.length)} of ${pokemon.length}`}</p>
      
      <div className="flex">
        <p>Up to</p>
        <select id="pageLength" name="pageLength" value={pageLength} onChange={changePageLength}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <p>pokemon per page</p>
      </div>

      <div className="flex">
        <p>Filter by type:</p>
        <select id="types" name="types" value={selectedType} onChange={changePokemonList}>
          <option value={'noType'} disabled>Select</option>
          {types.map((type) => {
            return <option value={type}>{type}</option>
          })}
        </select>
        <button disabled={allPokemon.length === pokemon.length} onClick={removeFilter}>Remove</button>
      </div>
    </main>
  )
}

export default App
