import {getIndexes} from './utils'
import {StyleSheet} from 'react-native'
import {
  verticalB,
  yellows,
  DARK_BROWN,
  LIGHT_BROWN,
  GREY_LIGHT,
  BORDER_COLOR,
} from '../constans'

export const getStyle = (position, type, copyVal, currSelected) => {
  copyVal = Object.keys(copyVal).map(i => copyVal[i])
  const indexes = getIndexes(copyVal, type)
  if (type === 'v' || (type === 's' && currSelected === 'v')) {
    if (position === Math.max(...indexes)) {
      return {
        styleCircle: styles.middleCircleLeft,
        styleBox: {
          backgroundColor: currSelected === 'v' ? DARK_BROWN : LIGHT_BROWN,
          borderLeftColor: currSelected === 'v' ? DARK_BROWN : LIGHT_BROWN,
          ...styles.middleBoxLeft,
        },
      }
    }
    return {
      styleCircle: styles.middleCircleRight,
      styleBox: {
        backgroundColor: currSelected === 'v' ? DARK_BROWN : LIGHT_BROWN,
        borderRightColor: currSelected === 'v' ? DARK_BROWN : LIGHT_BROWN,
        ...styles.middleBoxRight,
      },
    }
  }
  if (
    verticalB.includes(type) ||
    (type === 's' && verticalB.includes(currSelected))
  ) {
    if (position === Math.max(...indexes)) {
      return {
        styleCircle: styles.middleCircleUp,
        styleBox: {
          ...styles.middleBoxUp,
          backgroundColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          borderTopColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
        },
      }
    }
    return {
      styleCircle: styles.middleCircleDown,
      styleBox: {
        backgroundColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
        borderBottomColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
        ...styles.middleBoxDown,
      },
    }
  }
  if (
    yellows.includes(type) ||
    (type === 's' && yellows.includes(currSelected))
  ) {
    return {
      styleCircle: styles.completeCircle,
      styleBox: {
        borderColor: BORDER_COLOR,
        backgroundColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
        ...styles.completeBox,
      },
    }
  }

  if (type === 'r' || (type === 's' && currSelected === 'r')) {
    if (position === Math.max(...indexes)) {
      return {
        styleCircle: styles.squareRightDown,
        styleBox: {
          borderTopColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          borderLeftColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          backgroundColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          ...styles.squareBoxRightDown,
        },
      }
    }
    if (position === Math.min(...indexes)) {
      return {
        styleCircle: styles.squareLeftUp,
        styleBox: {
          borderBottomColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          backgroundColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          borderRightColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
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
          borderRightColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          backgroundColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          borderTopColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
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
          borderBottomColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          borderLeftColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          backgroundColor: type === 's' ? DARK_BROWN : LIGHT_BROWN,
          ...styles.squareBoxRightUp,
        },
      }
    }
  }
  if (type === '_') {
    return {
      styleBox: {
        borderColor: 'white',
        backgroundColor: 'white',
        ...styles.completeBox,
      },
    }
  }
  return {
    styleBox: {
      borderColor: BORDER_COLOR,
      backgroundColor: GREY_LIGHT,
      ...styles.completeBox,
    },
  }
}

const styles = StyleSheet.create({
  completeCircle: {
    borderRadius: 60,
    backgroundColor: '#F7EA00',
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
  },
  middleBoxLeft: {
    borderWidth: 0.5,
    borderRightColor: BORDER_COLOR,
    borderTopColor: BORDER_COLOR,
    borderBottomColor: BORDER_COLOR,
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
  },
  middleBoxUp: {
    borderWidth: 0.5,
    borderRightColor: BORDER_COLOR,
    borderBottomColor: BORDER_COLOR,
    borderLeftColor: BORDER_COLOR,
  },
  squareBoxRightDown: {
    borderWidth: 0.5,
    borderRightColor: BORDER_COLOR,
    borderBottomColor: BORDER_COLOR,
  },
  squareBoxRightUp: {
    borderWidth: 0.5,
    borderRightColor: BORDER_COLOR,
    borderTopColor: BORDER_COLOR,
  },
  squareBoxLeftUp: {
    borderWidth: 0.5,
    borderLeftColor: BORDER_COLOR,
    borderTopColor: BORDER_COLOR,
  },
  squareBoxLeftDown: {
    borderWidth: 0.5,
    borderBottomColor: BORDER_COLOR,
    borderLeftColor: BORDER_COLOR,
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
