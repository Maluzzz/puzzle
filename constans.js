export const initBoard = `
_ _ _ _ _ _
_ b r r o _
_ b r r o _
_ f v v t _
_ p x i t _
_ p w k F _
`
export const finalBoard = `
_ _ _ _ _ _
_ w k o b _
_ t p o b _
_ t p v v _
_ x r r F _
_ i r r f _
`
export const almostFinished = `
_ _ _ _ _ _
_ w k o b _
_ t p o b _
_ t p v v _
_ x F r r _
_ i f r r _
`

export const colors = {
  b: {color: '#005F73'},
  v: {color: '#005F73'},
  p: {color: '#005F73'},
  t: {color: '#005F73'},
  o: {color: '#005F73'},
  f: {color: 'grey'},
  F: {color: 'grey'},
  r: {color: '#9B2226'},
  k: {color: '#EE9B00'},
  x: {color: '#EE9B00'},
  w: {color: '#EE9B00'},
  i: {color: '#EE9B00'},
  _: {color: 'white'},
  s: {color: 'green'},
}

export const frees = ['F', 'f']
export const yellows = ['x', 'w', 'k', 'i']
export const verticalB = ['o', 'b', 'p', 't']
export default frees
export const notSelectable = ['s', '_', 'F', 'f']
export const restPiezes = ['o', 'b', 'p', 't', 'r', 'v']

export const DARK_BROWN = '#532E10'
export const BORDER_COLOR = '#6A6262'
export const LIGHT_BROWN = '#C5A880'
export const GREY_LIGHT = '#9C9990'
export const CORNERS_RADIUS = 4
