// Formula to extract types from pokemon data
export const getTypes = (data) => {
    const pokemonTypes = []
    data.forEach((pokemon) => {
        pokemon.types.forEach((type) => {
            if (!pokemonTypes.includes(type)) {
                pokemonTypes.push(type)
            }
        })
    })
    pokemonTypes.sort()
    return pokemonTypes
}