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

export const getWhereToMove = (
  xDistance,
  yDistance,
  freeArround,
  stateBoard,
) => {
  if (
    Math.max(Math.abs(xDistance), Math.abs(yDistance)) === Math.abs(yDistance)
  ) {
    if (yDistance < 0) {
      return stateBoard[Math.min(...freeArround)]
    } else {
      return stateBoard[Math.max(...freeArround)]
    }
  } else {
    var list = []
    freeArround = [Math.min(...freeArround), Math.max(...freeArround)]
    for (var i = freeArround[0]; i <= freeArround[1]; i++) {
      list.push(i)
    }
    const fressInDifferentsLines =
      list.filter(i => stateBoard[i] === '_').length !== 0
    if (xDistance < 0) {
      if (!fressInDifferentsLines) {
        return stateBoard[Math.min(...freeArround)]
      } else {
        const ind = getIndexes(stateBoard, 's')
        if (Math.min(...freeArround) === ind[0] - 1) {
          return stateBoard[Math.min(...freeArround)]
        } else {
          return stateBoard[Math.max(...freeArround)]
        }
      }
    } else {
      if (!fressInDifferentsLines) {
        return stateBoard[Math.max(...freeArround)]
      } else {
        const ind = getIndexes(stateBoard, 's')

        if (Math.min(...freeArround) === ind[0] + 1) {
          return stateBoard[Math.min(...freeArround)]
        } else {
          return stateBoard[Math.max(...freeArround)]
        }
      }
    }
  }
}
export default getIndexes
