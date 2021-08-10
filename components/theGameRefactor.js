/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react'
import {Alert, Text, View} from 'react-native'

import {
  initBoard,
  frees,
  finalBoard,
  notSelectable,
  yellows,
  restPiezes,
} from '../constans'
import {getIndexes, getAround} from './utils'
import {getStyle} from './styles'

const initBoardParsed = initBoard.trim().replace(/\n|\s/gi, '').split('')
const finalBoardParsed = finalBoard.trim().replace(/\n|\s/gi, '').split('')

const GameRefactor = () => {
  const [stateBoard, setVal] = useState(initBoardParsed)
  const [currSelected, setCurrSelected] = useState('')

  const baseGrid = new Array(6).fill(new Array(6).fill(0))

  const changePiece = (
    board,
    type,
    origin,
    destiny,
    typeToChange,
    beforeType,
  ) => {
    destiny.forEach(index => {
      board[index] = typeToChange
    })
    origin.forEach((index, i) => {
      board[index] = beforeType[i] || beforeType[0]
    })
    setVal(board)
    setCurrSelected(type)
  }
  const handleTouch = (type, board) => {
    let boardArray = Object.keys(board).map(i => board[i])
    const selected = getIndexes(boardArray, type)
    const beforeSelected = getIndexes(boardArray, 's')

    const isValidPiece = !notSelectable.includes(type)
    if (isValidPiece) {
      changePiece(boardArray, type, beforeSelected, selected, 's', currSelected)
    }

    const isFreeTouched = type === 'F' || type === 'f'

    if (isFreeTouched) {
      const aroundSelected = getAround(beforeSelected)
      const isFreeAround =
        selected.filter(pieza => aroundSelected.includes(pieza)).length !== 0
      if (!isFreeAround) {
        return null
      }
      const aroundFreeSelected = getAround(selected)
      const aroundCoincide = aroundSelected.filter(one =>
        aroundFreeSelected.includes(one),
      )
      let overlap = beforeSelected.filter(pieza =>
        aroundFreeSelected.includes(pieza),
      )
      let notOverlap = beforeSelected.filter(
        pieza => !aroundFreeSelected.includes(pieza),
      )

      let replace = [...overlap, ...selected]
      const isYellow = yellows.includes(currSelected)
      const isBlackOrRed = restPiezes.includes(currSelected)
      const oneFreeNeeded =
        isYellow || (isBlackOrRed && aroundCoincide.length === 0)
      if (oneFreeNeeded) {
        notOverlap = isYellow ? beforeSelected : notOverlap
        changePiece(boardArray, type, notOverlap, replace, currSelected, type)
      } else {
        const isTwoFreeAround =
          boardArray[aroundCoincide[0]] !== 'F' &&
          boardArray[aroundCoincide[0]] !== 'f'
        if (isTwoFreeAround) {
          return null
        }
        const aroundTwoFree = getAround([...aroundCoincide, ...selected])

        overlap =
          currSelected === 'r'
            ? beforeSelected.filter(pieza => aroundTwoFree.includes(pieza))
            : overlap
        notOverlap =
          currSelected === 'r'
            ? beforeSelected.filter(pieza => !aroundTwoFree.includes(pieza))
            : notOverlap
        replace = currSelected !== 'r' ? beforeSelected : notOverlap
        changePiece(
          boardArray,
          type,
          replace,
          [...selected, ...aroundCoincide, ...overlap],
          currSelected,
          frees,
        )
        checkIfIsWinner(boardArray)
      }
    }
  }
  const checkIfIsWinner = boardArray => {
    const reds = getIndexes(boardArray, 'r')
    const winningReds = getIndexes(finalBoardParsed, 'r')
    if (reds.filter(element => winningReds.includes(element)).length === 4) {
      Alert.alert('YOU WIN')
    }
  }

  return (
    <View>
      {baseGrid.map((array, y) => {
        return (
          <View style={{flex: 1, flexDirection: 'row'}} key={y}>
            {array.map((_, x) => {
              const {styleCircle, styleBox} = getStyle(
                x + 6 * y,
                stateBoard[x + 6 * y],
                {
                  ...stateBoard,
                },
                currSelected,
              )
              return (
                <View
                  key={x}
                  style={{
                    width: 60,
                    height: 60,
                    flex: 1,
                    ...styleBox,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onTouchStart={() => {
                    handleTouch(stateBoard[x + 6 * y], {...stateBoard})
                  }}>
                  <View
                    style={{
                      ...styleCircle,
                      width: 30,
                      height: 30,
                    }}>
                    <Text>{x + 6 * y}</Text>
                  </View>
                </View>
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

export default GameRefactor
