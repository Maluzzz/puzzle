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

export const frees = ['F', 'f']
export const oneSquarePieces = ['x', 'w', 'k', 'i']
export const verticalPieces = ['o', 'b', 'p', 't']

export const notSelectable = ['s', '_', 'F', 'f']
export const restPiezes = ['o', 'b', 'p', 't', 'r', 'v']

export const DARK_BROWN = '#532E10'
export const BORDER_COLOR = '#6A6262'
export const LIGHT_BROWN = '#C5A880'
export const GREY_LIGHT = '#9C9990'
export const CORNERS_RADIUS = 6

export default frees
