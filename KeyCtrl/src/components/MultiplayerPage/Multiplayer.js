import React, { useState, useRef, useEffect } from "react"
import styled from 'styled-components'
import io from "socket.io-client"
import { Modal } from './Modal.js'

import '../../styles/Modal.css'
import '../../styles/MultiplayerPage.css'
import MultiplayerGame from "./MultiplayerGame.js"
import { MdSettings } from "react-icons/md"
import { GiLaurelsTrophy } from "react-icons/gi"
import { MdPrivateConnectivity, MdSearch } from "react-icons/md"
import Unranked from '../../assets/unranked.png'
import Wood from '../../assets/wood_rank.png'



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

const Multiplayer = ({ rankImage, rank, setAccountStats, accountStats, handleAddFriend, setAddFriend, loggedIn, accountInfo, openFAccount, inviteLobby, setInviteLobby, lobbyID, setLobbyID }) => {

  //Set lobby join state and update during button press
  const [joinLobby, setJoinLobby] = useState(false)
  const [name, setName] = useState('guest' + Math.floor(Math.random() * 1000))
  const [isFindMatch, setFindMatch] = useState(false)
  const [inRanked, setInRanked] = useState(false)

  const socketRef = useRef()

  useEffect(
    () => {
      determineName()
      if (socketRef.current == null) {
        console.log("creating new connection")
        socketRef.current = io.connect(process.env.REACT_APP_KEYCTRL_MP)
      }
      //Finding Match code...
      socketRef.current.on('findMatchSuccess', (lobby) => {
        console.log(socketRef.current.id + " found a match")
        //socketRef.current.disconnect()
        setLobbyID(lobby)
        setShowModal(false)
        setJoinLobby(true)
      })
      console.log(inviteLobby)
    })

  useEffect(() => {
    if (inviteLobby != 0) {
      console.log("Going inside lobby", inviteLobby)
      setLobbyID(inviteLobby)
      setJoinLobby(true)
    }
  })

  //Enter lobby modal
  const [showModal, setShowModal] = useState(false)
  function determineName() {
    if (loggedIn && typeof accountInfo.display_name !== 'undefined') {
      console.log(name)
      setName(accountInfo.display_name)
    }
  }
  function findMatch() {
    setFindMatch(true)
    setShowModal(true)
    socketRef.current.emit('findMatch')
  }

  function findRankedMatch() {
    setFindMatch(true)
    setShowModal(true)
    socketRef.current.emit('findRankedMatch')
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
        {showModal ? <Modal setShowModal={setShowModal} cancelFindMatch={cancelFindMatch} isFindMatch={isFindMatch} setJoinLobby={setJoinLobby} setLobbyID={setLobbyID} name={name} setName={setName} /> : null}
        {joinLobby ? null :
          <div className="multiplayer-Icons">
            <div onClick={enterLobbyModal} className='find-game'>
              <div className="multiplayer-select-text">
                Private Match
              </div>
              <MdPrivateConnectivity style={{ fontSize: '17em' }} />
              <div className="multiplayer-description-text">
                Open a private lobby to invite participants to a friendly typing game
              </div>
            </div>
          </div>
        }

        {joinLobby ? null :
          <div className="multiplayer-Icons">
            <div onClick={() => {
              findMatch()
              setInRanked(false)
            }} className='find-game' >
              <div className="multiplayer-select-text">
                Find Game
              </div>
              <MdSearch style={{ fontSize: '17em' }} />
              <div className="multiplayer-description-text">
                Join a queue to find a random online game and participate against new foes
              </div>
            </div>
          </div>

        }


        {joinLobby || !loggedIn ? null :
          <div className="multiplayer-Icons">
            <div onClick={() => {
              findRankedMatch()
              setInRanked(true)
            }} className='find-game'>
              <div className="multiplayer-select-text">
                Ranked
              </div>
              <GiLaurelsTrophy style={{ fontSize: '13em' }} />
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <div className="ranked-mmr">
                  MMR
                  <div style={{ color: 'var(--selection-color)' }}>
                    {accountStats[6][0].mmr}
                  </div>
                </div>
                <div className='ranked-tile'>
                  <img src={rankImage} />
                  <div style={{ color: 'var(--selection-color)' }}>{rank}</div>
                </div>
              </div>
            </div>
          </div>
        }

        {joinLobby ?
          <MultiplayerGame
            lobbyID={lobbyID}
            username={name}
            isFindMatch={isFindMatch}
            setFindMatch={setFindMatch}
            setJoinLobby={setJoinLobby}
            setShowModal={setShowModal}
            setLobbyID={setLobbyID}
            loggedIn={loggedIn}
            accountInfo={accountInfo}
            openFAccount={openFAccount}
            handleAddFriend={handleAddFriend}
            setAddFriend={setAddFriend}
            setInviteLobby={setInviteLobby}
            setAccountStats={setAccountStats}
            accountStats={accountStats}
            inRanked={inRanked}
          />
          : null}
      </div>
      <div id='portal'></div>
      <div id='hiddenLobbyId' css="display:none"></div>
    </div>
  )
}

export default Multiplayer