import React, { useState } from "react"
import styled from 'styled-components'
import { Lobby } from './Lobby.js'
import { Modal } from './Modal.js'

import '../../styles/Modal.css'
import '../../styles/MultiplayerPage.css'
import MultiplayerGame from "./MultiplayerGame.js"
import { MdSettings } from "react-icons/md"
import { GiMagnifyingGlass } from "react-icons/gi"
import { GiThreeFriends } from "react-icons/gi"
import {MdPrivateConnectivity} from "react-icons/md"



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

  //Enter lobby modal
  const [showModal, setShowModal] = useState(false)
  function findMatch() {
    //find match code
  }

  function enterLobbyModal() {
    setShowModal(true)
  }

  return (
    <div className='multiplayer-background'>
      <div className='multiplayer-base'>
        {joinLobby ? null : 
        <div className="multiplayer-Icons"> 
              <div onClick={findMatch} className = 'find-game' > 
                <GiMagnifyingGlass style={{fontSize: '20em'}}/>
                <div className="multiplayer-select-text">
                  Find Game
                </div>
            
              </div>



        </div>
        }
        
        {joinLobby ? null : 
        <div className="multiplayer-Icons">
          <div onClick={enterLobbyModal} className='find-game'>
            <MdPrivateConnectivity style={{fontSize: '20em'}}/>
            <div className="multiplayer-select-text">
            Private Match
          </div>

          </div>
        </div>
        }

        
        {showModal ? <Modal setShowModal={setShowModal} setJoinLobby={setJoinLobby} setLobbyID={setLobbyID} setName={setName} /> : null}
        {/* {joinLobby ? <Lobby lobbyID={lobbyID}/> : null} */}
        {joinLobby ? <MultiplayerGame lobbyID={lobbyID} username={name} /> : null}
      </div>
      <div id='portal'></div>
      <div id='hiddenLobbyId' css="display:none"></div>
    </div>
  )
}

export default Multiplayer