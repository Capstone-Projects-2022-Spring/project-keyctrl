import React, { useState } from "react"
import styled from 'styled-components'
import '../../styles/MultiplayerPage.css'
import { Lobby } from './Lobby.js'

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

const Multiplayer = () => {  
  //Set lobby join state and update during button press
  const [joinLobby, inLobby] = useState(false)
  var lobbyID = 1
  function findMatch() {
    //ADD CODE TO GENERATE LOBBY ID
    inLobby(true)
  }

  return (
    <div>
      <div className='multiplayer-base'>
        <div>Multiplayer</div>
        {joinLobby ? null : <Button onClick={findMatch} >Find Match</Button>}
        {joinLobby ? <Lobby lobbyID={lobbyID}/> : null}
      </div>
    </div>
  )
}

export default Multiplayer