import React, { FormEvent, useState } from 'react'
import { matrix, fillMap } from './helpers/helpers'
import './App.css'
import { drawWater } from './helpers/addWater'
import { config } from './config'

function App() {
  const initialState = fillMap(
    matrix(config.columns),
    config.columns,
  )
  const [tiles, setTiles] = useState(initialState)

  console.log(
    matrix(config.columns),
    Array(config.columns).fill(Array(config.columns))
  )
  const grid = Array(config.columns).fill(0)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = form ? new FormData(form) : []

    const formJson = Object.fromEntries(formData.entries()) as unknown as {
      row: string
      column: string
    }
    const updatedTiles = drawWater(formJson, tiles)
    setTiles([...updatedTiles])
  }

  return (
    <>
      <div className='app'>
        <form method='post' onSubmit={(e) => handleSubmit(e)}>
          <p>Add a water tile to the Map (Zero based).</p>
          <label className='label' htmlFor='row'>
            Row:
          </label>

          <input
            type='number'
            id='row'
            name='row'
            min='0'
            max={config.columns - 1}
            className='input'
          />
          <label className='label' htmlFor='column'>
            Column:
          </label>

          <input
            type='number'
            id='column'
            name='column'
            min='0'
            max={config.columns - 1}
            className='input'
          />
          <input id='draw' type='submit' value='Draw' />
        </form>
        <div className='rows'>
          <span className='label'>Water tile</span>
          <img
            className='sample'
            alt='Water tile sample'
            title='Water tile sample'
            src='images/48.jpg'
          />
        </div>
        <div className='rows'>
          <div
            style={{
              width: `${config.imageWidth}px`,
              height: `${config.imageHeight}px`
            }}
          ></div>
          {grid.map((item, index) => (
            <div
              key={index}
              style={{
                width: `${config.imageWidth}px`,
                textAlign: 'center'
              }}
            >
              {index}
            </div>
          ))}
        </div>
        <div className='container'>
          <div>
            {grid.map((item, index) => (
              <div
                key={index}
                style={{
                  width: `${config.imageWidth}px`,
                  height: `${config.imageHeight - 3}px`,
                  textAlign: 'center',
                  paddingTop: `3px`,
                }}
              >
                {index}
              </div>
            ))}
          </div>

          <div
            style={{
              width: `${config.imageWidth * config.columns}px`,
              height: `${config.imageHeight * config.columns}px`
            }}
          >
            {tiles.map((row, rowIndex) =>
              row.map((tile, index) => (
                <div
                  key={tile + '.jpg' + index + rowIndex}
                  style={{
                    width: `${config.imageWidth}px`,
                    height: `${config.imageHeight}px`,
                    border: 0,
                    outline: 0,
                    backgroundImage: 'url(/images/' + tile + '.jpg)',
                    float: 'left'
                  }}
                ></div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
