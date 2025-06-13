  // Function to isolate the data required for the current page
  export const getPage = (page, pageLength, pokemon) => {
    const itemFirst = page * pageLength
    const itemLast = (page + 1) * pageLength
    return {
      data: pokemon.slice(itemFirst, itemLast),
      first: itemFirst,
      last: itemLast
    }
  }