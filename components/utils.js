export const getIndexes = (arr, type) => {
  return arr
    .map((one, i) => {
      if (one === type) {
        return i
      } else {
        return 0
      }
    })
    .filter(ones => ones !== 0)
}

export const getAround = indexes => {
  return indexes
    .reduce((acc, curr) => [...acc, curr + 1, curr - 1, curr + 6, curr - 6], [])
    .filter(function (value, index, array) {
      return array.indexOf(value) === index && !indexes.includes(value)
    })
}
export default getIndexes
