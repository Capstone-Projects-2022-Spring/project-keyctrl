import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: var(--primary-color);
  border-radius: .2em;
  border: 0px;
  color: var(--text-color);
  margin: 1em;
  padding: 0.25em 1em;
  font-family: "almarai";
  font-size: 2em;
  &:hover{
    transition: .25s;
    color: var(--selection-color);
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