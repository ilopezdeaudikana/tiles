import { config } from '../config'

export const lookForWater = (
  row: number,
  column: number,
  tiles: number[][]
) => {
  const rows = [row, row - 1, row + 1]
  const columns = [column, column - 1, column + 1]

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      if (tiles[rows[i]][columns[j]] === config.water) {
        return true
      }
    }
  }
  return false
}

export const drawWater = (
  { row, column }: { row: string; column: string },
  tiles: number[][]
) => {
  const i = parseInt(row)
  const j = parseInt(column)

  if (tiles[i][j] === config.water) return tiles

  if (lookForWater(i, j, tiles)) {
    tiles[i][j] = config.water
  }
  return tiles
}
