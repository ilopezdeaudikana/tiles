import { config } from '../config'

export const matrix = (n: number) => {
  const matrix = []
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n)
  }
  return matrix
}

export const from0toRange = (n: number) => Math.floor(Math.random() * n + 1)

export const fillMap = (matrix: number[][], n: number) => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 6 || i === 7 || i === 8 || i === 9) {
        matrix[i][j] = config.water
      } else {
        matrix[i][j] = from0toRange(config.range)
      }
    }
  }
  return matrix
}

