/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react'
import {Alert, View} from 'react-native'


import {
  initBoard,
  frees,
  finalBoard,
  notSelectable,
  oneSquarePieces,
  restPiezes,
  almostFinished,
  BORDER_COLOR,
  DARK_BROWN,
} from '../constans'
import {getIndexes, getAround, getWhereToMove} from './utils'
import {getStyle} from './styles'

const initBoardParsed = almostFinished.trim().replace(/\n|\s/gi, '').split('')
const finalBoardParsed = finalBoard.trim().replace(/\n|\s/gi, '').split('')

const getMatrix = n => new Array(n).fill(new Array(n).fill(0))
const MATRIX_SIZE = 6

const Refactor = () => {
  const [stateBoard, setBoard] = useState(initBoardParsed)
  const [currSelectedPiece, setCurrSelected] = useState('')
  const [startTouchX, setStartTouchX] = useState(0)
  const [startTouchY, setStartTouchY] = useState(0)

  const baseGrid = getMatrix(MATRIX_SIZE)

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
    setBoard(board)
    setCurrSelected(type)
  }

  const handleTouch = (type, board) => {
    const boardArray = Object.keys(board).map(i => board[i])
    const selectedPiece = getIndexes(boardArray, type)
    const previouslySelectedPiece = getIndexes(boardArray, 's')

    const isPieceValid = !notSelectable.includes(type)
    if (isPieceValid) {
      changePiece(
        boardArray,
        type,
        previouslySelectedPiece,
        selectedPiece,
        's',
        currSelectedPiece,
      )
    }

    const userCanMove = type === 'F' || type === 'f'
    if (!userCanMove) {
      return null
    }

    const aroundPreviouslySelectedPiece = getAround(previouslySelectedPiece)
    const isFreeAround =
      selectedPiece.filter(piece =>
        aroundPreviouslySelectedPiece.includes(piece),
      ).length !== 0
    // const isFreeAround = !selectedPiece.some(piece => aroundPreviouslySelectedPiece.includes(piece))

    if (!isFreeAround) {
      return null
    }

    const aroundFreeSelectedPiece = getAround(selectedPiece)
    const aroundCoincide = aroundPreviouslySelectedPiece.filter(one =>
      aroundFreeSelectedPiece.includes(one),
    )
    let overlap = previouslySelectedPiece.filter(pieza =>
      aroundFreeSelectedPiece.includes(pieza),
    )
    let notOverlap = previouslySelectedPiece.filter(
      pieza => !aroundFreeSelectedPiece.includes(pieza),
    )

    let replace = [...overlap, ...selectedPiece]
    const isOneBlockPiece = oneSquarePieces.includes(currSelectedPiece)
    const isMultipleBlocksPiece = restPiezes.includes(currSelectedPiece)
    const oneFreeNeeded =
      isOneBlockPiece || (isMultipleBlocksPiece && aroundCoincide.length === 0)

    if (oneFreeNeeded) {
      notOverlap = isOneBlockPiece ? previouslySelectedPiece : notOverlap
      changePiece(
        boardArray,
        type,
        notOverlap,
        replace,
        currSelectedPiece,
        type,
      )
    } else {
      const isTwoFreeAround =
        boardArray[aroundCoincide[0]] !== 'F' &&
        boardArray[aroundCoincide[0]] !== 'f'
      if (isTwoFreeAround) {
        return null
      }

      const aroundTwoFree = getAround([...aroundCoincide, ...selectedPiece])

      overlap =
        currSelectedPiece === 'r'
          ? previouslySelectedPiece.filter(pieza =>
              aroundTwoFree.includes(pieza),
            )
          : overlap
      notOverlap =
        currSelectedPiece === 'r'
          ? previouslySelectedPiece.filter(
              pieza => !aroundTwoFree.includes(pieza),
            )
          : notOverlap
      replace = currSelectedPiece !== 'r' ? previouslySelectedPiece : notOverlap
      changePiece(
        boardArray,
        type,
        replace,
        [...selectedPiece, ...aroundCoincide, ...overlap],
        currSelectedPiece,
        frees,
      )

      checkIfIsWinner(boardArray)
    }
  }

  const checkIfIsWinner = boardArray => {
    const reds = getIndexes(boardArray, 'r')
    const winningReds = getIndexes(finalBoardParsed, 'r')
    if (reds.filter(element => winningReds.includes(element)).length === 4) {
      Alert.alert('YOU WIN') //Link on how wins work in the game
    }
  }
  const calculeSlideDirectionAndMove = e => {
    const xDistance = e.nativeEvent.pageX - startTouchX
    const yDistance = e.nativeEvent.pageY - startTouchY

    const around = getAround(getIndexes(stateBoard, 's'))
    let freeArround = around.filter(
      x => stateBoard[x] === 'F' || stateBoard[x] === 'f',
    )
    const moveTo = getWhereToMove(xDistance, yDistance, freeArround, stateBoard)
    handleTouch(moveTo, stateBoard)
  }

  return (
    <View style={{backgroundColor: BORDER_COLOR, paddingTop: 100}}>
      {baseGrid.map((array, y) => {
        const height = y === 0 ? 30 : 60
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              position: 'relative',
              height: height,
            }}
            key={y}>
            {array.map((_, x) => {
              const {styleCircle, styleBox} = getStyle(
                x + MATRIX_SIZE * y,
                stateBoard[x + MATRIX_SIZE * y],
                stateBoard,
                currSelectedPiece,
              )
              const iheight =
                stateBoard[x + MATRIX_SIZE * y] === '_' && y !== 0 ? 30 : 60
              const paddingLeft =
                stateBoard[x + MATRIX_SIZE * y] === '_' &&
                ![5, 10, 17, 23, 29, 35].includes(x)
                  ? 30
                  : 0

              return (
                <View
                  key={x}
                  style={{
                    width: iheight,
                    height: 60,
                    ...styleBox,
                    position: 'absolute',
                    left: x * 60 + paddingLeft,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onTouchStart={e => {
                    setStartTouchX(e.nativeEvent.pageX)
                    setStartTouchY(e.nativeEvent.pageY)
                    handleTouch(stateBoard[x + MATRIX_SIZE * y], stateBoard)
                  }}
                  onTouchEnd={e => calculeSlideDirectionAndMove(e)}>
                  <View
                    style={{
                      ...styleCircle,
                      width: 30,
                      height: 30,
                    }}>
                    {/* {__DEV___ && <Text>{x + 6 * y}</Text>} */}
                  </View>
                </View>
              )
            })}
          </View>
        )
      })}
      <View
        style={{
          backgroundColor: DARK_BROWN,
          width: 300,
          height: 30,
          marginLeft: 30,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}>
        <View
          style={{
            backgroundColor: 'black',
            width: 120,
            marginLeft: 90,
            borderRadius: 10,
            height: 10,
          }}/>
      </View>
    </View>
  )
}

export default Refactor
