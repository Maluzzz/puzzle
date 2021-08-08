/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react'
import {Alert, View} from 'react-native'

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
    beforeS,
    selected,
    typeToChange,
    beforeType,
  ) => {
    /**
     * Change the type of the touched piece to 's'
     * this means is going to show in other color
     */
    selected.forEach(index => {
      board[index] = typeToChange
    })
    /**Return the beforeSelected piece to their color */
    beforeS.forEach(index => {
      board[index] = beforeType
    })

    setVal(board)
    setCurrSelected(type)
  }
  const handleTouch = (type, board) => {
    let boardArray = Object.keys(board).map(i => board[i])
    const selected = getIndexes(boardArray, type)
    const beforeSelected = getIndexes(boardArray, 's')
    /**
     * If the piece touched is a selectable one
     */
    if (!notSelectable.includes(type)) {
      changePiece(boardArray, type, beforeSelected, selected, 's', currSelected)
    }
    const isFreeTouched = type === 'F' || type === 'f'
    if (isFreeTouched) {
      const aroundFreeSelected = getAround(selected)
      const aroundSelected = getAround(beforeSelected)
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

      if (
        selected.filter(pieza => aroundSelected.includes(pieza)).length !== 0
      ) {
        if (yellows.includes(currSelected)) {
          /**one cell pieces are the easier to move */
          changePiece(
            boardArray,
            type,
            beforeSelected,
            selected,
            currSelected,
            type,
          )
        }
        if (restPiezes.includes(currSelected)) {
          if (aroundCoincide.length === 0) {
            /**Movements that only requires one free piece*/
            replace = [...overlap, ...selected]
            changePiece(
              boardArray,
              type,
              notOverlap,
              replace,
              currSelected,
              type,
            )
          } else {
            if (
              boardArray[aroundCoincide[0]] !== 'F' &&
              boardArray[aroundCoincide[0]] !== 'f'
            ) {
              //NO VALID MOVEMENT
              return null
            } else {
              const aroundTwoFree = getAround([...aroundCoincide, ...selected])
              overlap =
                currSelected === 'r'
                  ? beforeSelected.filter(pieza =>
                      aroundTwoFree.includes(pieza),
                    )
                  : overlap
              notOverlap =
                currSelected === 'r'
                  ? beforeSelected.filter(
                      pieza => !aroundTwoFree.includes(pieza),
                    )
                  : notOverlap
              ;[...selected, ...aroundCoincide, ...overlap].forEach(
                index => (boardArray[index] = currSelected),
              )
              replace = currSelected !== 'r' ? beforeSelected : notOverlap
              replace.forEach((index, i) => (boardArray[index] = frees[i]))
              const reds = getIndexes(boardArray, 'r')
              const winningReds = getIndexes(finalBoardParsed, 'r')
              if (
                reds.filter(element => winningReds.includes(element)).length ===
                4
              ) {
                Alert.alert('YOU WIN')
              }
            }
          }
        }
        setVal(boardArray)
        setCurrSelected('')
      } else {
        //NO VALID MOVEMENT
        return null
      }
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
                    }}></View>
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
