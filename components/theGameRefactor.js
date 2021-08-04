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

const value = initBoard.trim().replace(/\n|\s/gi, '').split('')
const finalBoardParsed = finalBoard.trim().replace(/\n|\s/gi, '').split('')
const GameRefactor = () => {
  const [val, setVal] = useState(value)
  const [currSelected, setCurrSelected] = useState('')

  const arr = new Array(6).fill(new Array(6).fill(0))
  const selectPieze = (board, type, beforeS, selected) => {
    /**
     * Change the type of the touched pieze to 's'
     * this means is going to show in other color
     */
    selected.forEach(index => {
      board[index] = 's'
    })
    /**Return the beforeSelected pieze to their color */
    beforeS.forEach(index => {
      board[index] = currSelected
    })

    setVal(board)
    setCurrSelected(type)
  }
  const handleTouch = (type, board) => {
    board = Object.keys(board).map(i => board[i])
    const selected = getIndexes(board, type)
    const beforeSelected = getIndexes(board, 's')
    /**
     * If the pieze touched is a selectable one
     */
    if (!notSelectable.includes(type)) {
      selectPieze(board, type, beforeSelected, selected)
    }
    /**
     * If the pieze touched is a free one
     * start the process to check if the movement is valid
     */
    if (type === 'F' || type === 'f') {
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
          /**one cell piezes are the easier to move */
          selected.forEach(index => {
            board[index] = currSelected
          })
          beforeSelected.forEach(index => {
            board[index] = type
          })
        }
        if (restPiezes.includes(currSelected)) {
          if (aroundCoincide.length === 0) {
            replace = [...overlap, ...selected]
            
            replace.forEach(index => (board[index] = currSelected))
            notOverlap.forEach(index => (board[index] = type))
            setVal(board)
            setCurrSelected('')
          } else {
            if (
              board[aroundCoincide[0]] !== 'F' &&
              board[aroundCoincide[0]] !== 'f'
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
                index => (board[index] = currSelected),
              )
              replace = currSelected !== 'r' ? beforeSelected : notOverlap
              replace.forEach((index, i) => (board[index] = frees[i]))
              const reds = getIndexes(board, 'r')
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
        setVal(board)
        setCurrSelected('')
      } else {
        //NO VALID MOVEMENT
        return null
      }
    }
  }

  return (
    <View>
      {arr.map((array, y) => {
        return (
          <View style={{flex: 1, flexDirection: 'row'}} key={y}>
            {array.map((_, x) => {
              const {styleCircle, styleBox} = getStyle(
                x + 6 * y,
                val[x + 6 * y],
                {
                  ...val,
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
                    handleTouch(val[x + 6 * y], {...val})
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
