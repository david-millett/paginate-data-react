import pokemon_data from "./utils/data"

const App = () => {

  const columns = ['number', 'name', 'types']

  const pokemon = pokemon_data

  

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
          {pokemon.map((mon) => {
            return (
              <tr key={mon.number}>
                {columns.map((column) => {
                  return (
                    <td key={column}>{mon[column]}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* {pokemon.map((mon) => {
        return (
          <p>{mon.name}</p>
        )
      })} */}
    </>
  )
}

export default App
