import {getIndexes} from './utils'
import {StyleSheet} from 'react-native'
import {
  verticalPieces,
  oneSquarePieces,
  DARK_BROWN,
  LIGHT_BROWN,
  BORDER_COLOR,
  CORNERS_RADIUS,
} from '../constans'


export const getStyle = (position, type, board, currSelected) => {
  board = Object.keys(board).map(i => board[i])
  const indexes = getIndexes(board, type)
  const selected = type === 's'
  const colorSelected = selected ? DARK_BROWN : LIGHT_BROWN
  const bottomRightPiece = position === Math.max(...indexes)
  const topLeftPiece =  position === Math.min(...indexes)
  const isHorizontalPiece = type === 'v' || (selected && currSelected === 'v')
  const isBorder = type === '_'
  const isBigSquarePiece = type === 'r' || (selected && currSelected === 'r')
  const isVerticalPiece =
    verticalPieces.includes(type) ||
    (selected && verticalPieces.includes(currSelected))
  const isOnePiece =
    oneSquarePieces.includes(type) ||
    (selected && oneSquarePieces.includes(currSelected))

  if (isHorizontalPiece) {
    if (bottomRightPiece) {
      return {
        styleCircle: styles.middleCircleLeft,
        styleBox: {
          backgroundColor: colorSelected,
          borderLeftColor: colorSelected,
          ...styles.middleBoxLeft,
        },
      }
    }
    return {
      styleCircle: styles.middleCircleRight,
      styleBox: {
        backgroundColor: colorSelected,
        borderRightColor: colorSelected,
        ...styles.middleBoxRight,
      },
    }
  }
  if (isVerticalPiece) {
    if (bottomRightPiece) {
      return {
        styleCircle: styles.middleCircleUp,
        styleBox: {
          ...styles.middleBoxUp,
          backgroundColor: colorSelected,
          borderTopColor: colorSelected,
        },
      }
    }
    return {
      styleCircle: styles.middleCircleDown,
      styleBox: {
        backgroundColor: colorSelected,
        borderBottomColor: colorSelected,
        ...styles.middleBoxDown,
      },
    }
  }
  if (isOnePiece) {
    return {
      styleCircle: styles.completeCircle,
      styleBox: {
        ...styles.completeBox,
        borderColor: BORDER_COLOR,
        backgroundColor: colorSelected,
        borderRadius: CORNERS_RADIUS,
      },
    }
  }

  if (isBigSquarePiece) {
    if (bottomRightPiece) {
      return {
        styleCircle: styles.squareRightDown,
        styleBox: {
          borderTopColor: colorSelected,
          borderLeftColor: colorSelected,
          backgroundColor: colorSelected,
          ...styles.squareBoxRightDown,
        },
      }
    }
    if (topLeftPiece) {
      return {
        styleCircle: styles.squareLeftUp,
        styleBox: {
          borderBottomColor: colorSelected,
          backgroundColor: colorSelected,
          borderRightColor: colorSelected,
          ...styles.squareBoxLeftUp,
        },
      }
    }
    if (
      position ===
      indexes.sort(function (a, b) {
        return b - a
      })[1]
    ) {
      return {
        styleCircle: styles.squareLeftDown,
        styleBox: {
          borderRightColor: colorSelected,
          backgroundColor: colorSelected,
          borderTopColor: colorSelected,
          ...styles.squareBoxLeftDown,
        },
      }
    }
    if (
      position ===
      indexes.sort(function (a, b) {
        return b - a
      })[2]
    ) {
      return {
        styleCircle: styles.squareRightUp,
        styleBox: {
          borderBottomColor: colorSelected,
          borderLeftColor: colorSelected,
          backgroundColor: colorSelected,
          ...styles.squareBoxRightUp,
        },
      }
    }
  }
  if (isBorder) {
    if (position === 0) {
      return {
        styleBox: {
          ...styles.borderStyle,
          borderTopLeftRadius: 30,
        },
      }
    }
    if (position === 5) {
      return {
        styleBox: {
          ...styles.borderStyle,
          borderTopRightRadius: 30,
          width: 30,
        },
      }
    }
    if (position === 4) {
      return {
        styleBox: {
          ...styles.borderStyle,
          width: 30,
        },
      }
    }
    return {
      styleBox: {
        ...styles.borderStyle,
      },
    }
  }
  return {
    //free pieces
    styleBox: {
      borderColor: BORDER_COLOR,
      backgroundColor: BORDER_COLOR,
      ...styles.completeBox,
      borderRadius: 0,
    },
  }
}

const styles = StyleSheet.create({
  completeCircle: {
    borderRadius: 60,
    backgroundColor: '#F7EA00',
  },
  borderStyle: {
    borderColor: DARK_BROWN,
    backgroundColor: DARK_BROWN,
  },
  completeBox: {
    borderWidth: 0.5,
  },
  middleCircleLeft: {
    borderRadius: 60,
    marginRight: 60,
    backgroundColor: 'black',
  },
  middleCircleRight: {
    borderRadius: 60,
    marginLeft: 60,
    backgroundColor: 'black',
  },
  middleBoxRight: {
    borderWidth: 0.5,
    borderTopColor: BORDER_COLOR,
    borderBottomColor: BORDER_COLOR,
    borderLeftColor: BORDER_COLOR,
    borderBottomLeftRadius: CORNERS_RADIUS,
    borderTopLeftRadius: CORNERS_RADIUS,
  },
  middleBoxLeft: {
    borderWidth: 0.5,
    borderRightColor: BORDER_COLOR,
    borderTopColor: BORDER_COLOR,
    borderBottomColor: BORDER_COLOR,
    borderBottomRightRadius: CORNERS_RADIUS,
    borderTopRightRadius: CORNERS_RADIUS,
  },
  middleCircleUp: {
    borderRadius: 60,
    marginBottom: 60,
    backgroundColor: 'black',
  },
  middleCircleDown: {
    borderRadius: 60,
    marginTop: 60,
    backgroundColor: 'black',
  },
  middleBoxDown: {
    borderWidth: 0.5,
    borderRightColor: BORDER_COLOR,
    borderTopColor: BORDER_COLOR,
    borderTopRightRadius: CORNERS_RADIUS,
    borderTopLeftRadius: CORNERS_RADIUS,
  },
  middleBoxUp: {
    borderWidth: 0.5,
    borderRightColor: BORDER_COLOR,
    borderBottomColor: BORDER_COLOR,
    borderLeftColor: BORDER_COLOR,
    borderBottomRightRadius: CORNERS_RADIUS,
    borderBottomLeftRadius: CORNERS_RADIUS,
  },
  squareBoxRightDown: {
    borderWidth: 0.5,
    borderRightColor: BORDER_COLOR,
    borderBottomColor: BORDER_COLOR,
    borderBottomRightRadius: CORNERS_RADIUS,
  },
  squareBoxRightUp: {
    borderWidth: 0.5,
    borderRightColor: BORDER_COLOR,
    borderTopColor: BORDER_COLOR,
    borderTopRightRadius: CORNERS_RADIUS,
  },
  squareBoxLeftUp: {
    borderWidth: 0.5,
    borderLeftColor: BORDER_COLOR,
    borderTopColor: BORDER_COLOR,
    borderTopLeftRadius: CORNERS_RADIUS,
  },
  squareBoxLeftDown: {
    borderWidth: 0.5,
    borderBottomColor: BORDER_COLOR,
    borderLeftColor: BORDER_COLOR,
    borderBottomLeftRadius: CORNERS_RADIUS,
  },
  squareLeftUp: {
    marginTop: 60,
    marginLeft: 60,
    borderRadius: 60,
    backgroundColor: '#BE0000',
  },
  squareRightUp: {
    marginTop: 60,
    marginRight: 60,
    borderRadius: 60,
    backgroundColor: '#BE0000',
  },
  squareLeftDown: {
    borderRadius: 60,
    marginBottom: 60,
    marginLeft: 60,
    backgroundColor: '#BE0000',
  },
  squareRightDown: {
    borderRadius: 60,
    marginBottom: 60,
    marginRight: 60,
    backgroundColor: '#BE0000',
  },
})
