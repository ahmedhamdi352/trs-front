import React, { useEffect, useState } from 'react'
import MButton from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import './style.css'
import { backBus, beforeDoor, aftereDoor, rightSide } from './busData';
import { xor } from 'lodash'

const BusPlaces = ({ chairs, selectedChairs, setSelectedChairs }) => {
  // const books = useSelector(({ books }) => books.books);
  // const [chairs, setChairs] = useState([])
  // const [selectedChairs, setSelectedChairs] = useState([])

  // useEffect(() => {
  //   books.map(item => {
  //     if (item.numberOfChairs !== null) {
  //       setChairs(item.numberOfChairs.split(','))
  //     }
  //   })
  // }, [books])

  const chairClicked = (value) => {
    if (selectedChairs.includes(value)) {
      setSelectedChairs(xor(selectedChairs, [value]))
    }
    else {
      setSelectedChairs([...selectedChairs, value])
    }
  }

  return (
    <>
      <div className="container">
        {backBus.map(item => (
          <div className="item">
            <MButton
              style={{
                fontFamily: "'Montserrat', sans-serif",
                width: '100%', margin: 0,
                textTransform: 'capitalize',
                borderWidth: '0px',
                color: '#ffff',
                backgroundColor: chairs.includes(item.name) ? '#f2294e' : selectedChairs.includes(item.name) ? '#0dc13a' : '#3F51B5'
              }}
              variant="contained"
              onClick={() => chairClicked(item.name)}
              disabled={chairs.includes(item.name)}
            >{item.name}</MButton>
          </div>
        ))}

      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="container1">
          {beforeDoor.map(item => (
            <div className="item1">
              <MButton
                variant="contained"
                style={{
                  color: '#ffff',
                  backgroundColor: chairs.includes(item.name) ? '#f2294e' : selectedChairs.includes(item.name) ? '#0dc13a' : '#3F51B5'
                }}
                onClick={() => chairClicked(item.name)}
                disabled={chairs.includes(item.name)}
              >{item.name}</MButton>
            </div>
          ))}

          <div className="block">xxx</div>

          {aftereDoor.map(item => (
            <div className="item1">
              <MButton
                variant="contained"
                style={{
                  color: '#ffff',
                  backgroundColor: chairs.includes(item.name) ? '#f2294e' : selectedChairs.includes(item.name) ? '#0dc13a' : '#3F51B5'
                }}
                onClick={() => chairClicked(item.name)}
                disabled={chairs.includes(item.name)}
              >{item.name}</MButton>
            </div>
          ))}

        </div>

        <div className="container1">

          {rightSide.map(item => (
            <div className="item">
              <MButton
                variant="contained"
                style={{
                  color: '#ffff',
                  backgroundColor: chairs.includes(item.name) ? '#f2294e' : selectedChairs.includes(item.name) ? '#0dc13a' : '#3F51B5'
                }}
                onClick={() => chairClicked(item.name)}
                disabled={chairs.includes(item.name)}
              >{item.name}</MButton>
            </div>
          ))}

          <div className="block">driver</div>
        </div>
      </div>
    </>
  )
}

export default BusPlaces