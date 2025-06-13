
export const getTypes = (data) => {
    const pokemonTypes = []
    data.forEach((pokemon) => {
        pokemon.types.forEach((type) => {
            if (!pokemonTypes.includes(type)) {
                pokemonTypes.push(type)
            }
        })
    })
    return pokemonTypes
}