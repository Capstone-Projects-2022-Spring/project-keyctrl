import React, { useState, useRef, useEffect } from "react"
import styled from 'styled-components'
import io from "socket.io-client"
import { Modal } from './Modal.js'

import '../../styles/Modal.css'
import '../../styles/MultiplayerPage.css'
import MultiplayerGame from "./MultiplayerGame.js"

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
  const [name, setName] = useState("")
  const [isFindMatch, setFindMatch] = useState(false)

  const socketRef = useRef()
    useEffect(
      () => {
        socketRef.current = io.connect("http://localhost:4000")
        //Finding Match code...
        socketRef.current.on('findMatchSuccess', (lobby) => {
          console.log(socketRef.current.id + " found a match")
          setLobbyID(lobby)
          setName('username' + Math.random() * 10000) //PLACE USERNAME LOGIC HERE (dont forget to handle logged out)
          setShowModal(false)
          setJoinLobby(true)
        })
      })

  //Enter lobby modal
  const [showModal, setShowModal] = useState(false)
  function findMatch() {
    setFindMatch(true)
    setShowModal(true)
    socketRef.current.emit('findMatch')
  }

  function cancelFindMatch() {
    socketRef.current.emit('cancelFindMatch')
    setFindMatch(false)
    setShowModal(false)
  }

  function enterLobbyModal() {
    setShowModal(true)
  }


  return (
    <div>
      <div className='multiplayer-base'>
        {joinLobby ? null : <Button onClick={findMatch} >Find Match</Button>}
        {joinLobby ? null : <Button onClick={enterLobbyModal} >Join Custom Lobby</Button>}
        {showModal ? <Modal setShowModal={setShowModal} cancelFindMatch={cancelFindMatch} isFindMatch={isFindMatch} setJoinLobby={setJoinLobby} setLobbyID={setLobbyID} setName={setName} /> : null}
        {/* {joinLobby ? <Lobby lobbyID={lobbyID}/> : null} */}
        {joinLobby ? <MultiplayerGame lobbyID={lobbyID} username={name} /> : null}
      </div>
      <div id='portal'></div>
      <div id='hiddenLobbyId' css="display:none"></div>
    </div>
  )
}

export default Multiplayer