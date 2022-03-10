import React, { useState } from "react"
import styled from 'styled-components'
import { Lobby } from './Lobby.js'
import { Modal } from './Modal.js'

import '../../styles/Modal.css'
import '../../styles/MultiplayerPage.css'

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

const Multiplayer = () => {  
  //Set lobby join state and update during button press
  const [joinLobby, setJoinLobby] = useState(false)
  const [lobbyID, setLobbyID] = useState(0)

  //Enter lobby modal
  const [showModal, setShowModal] = useState(false)
  function findMatch() {
    //find match code
  }

  function enterLobbyModal() {
    setShowModal(true)
  }

  return (
    <div>
      <div className='multiplayer-base'>
        <div>Multiplayer</div>
        {joinLobby ? null : <Button onClick={findMatch} >Find Match</Button>}
        {joinLobby ? null : <Button onClick={enterLobbyModal} >Join Custom Lobby</Button>}
        {showModal ? <Modal setShowModal={setShowModal} setJoinLobby={setJoinLobby} setLobbyID={setLobbyID} /> : null}
        {joinLobby ? <Lobby lobbyID={lobbyID}/> : null}
      </div>
      <div id='portal'></div>
      <div id='hiddenLobbyId' css="display:none"></div>
    </div>
  )
}

export default Multiplayer