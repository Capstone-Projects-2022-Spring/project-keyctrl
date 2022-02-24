import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: #3D3883;
  border-radius: .2em;
  border: 0px;
  color: #5B5A99;
  margin: 1em;
  padding: 0.25em 1em;
  font-family: "almarai";
  font-size: 2em;
  &:hover{
    color: #50E3C2;
    cursor: pointer;
  }
`

function findMatch(){
  console.log("Find match clicked");
}

const Multiplayer = () => {
  return (
    <div className='multiplayer-base'>
      <div>Multiplayer</div>
        <Button onClick={findMatch} >Find Match</Button>
      </div>
  )
}

export default Multiplayer