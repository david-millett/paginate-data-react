  // Function to generate an array of all pages
  export const getPageNumbers = (pageFirst, pageLast) => {
    return Array.from({ length: pageLast - pageFirst}, (_, i) => pageFirst + i)
  }