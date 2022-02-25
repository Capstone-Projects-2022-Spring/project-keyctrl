import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import styled from 'styled-components'
import '../../styles/MultiplayerPage.css'

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

  function findMatch() {
    console.log("Find match clicked");
  }

  const [state, setState] = useState({ message: "", name: "" })
  const [chat, setChat] = useState([])

  const socketRef = useRef()

  useEffect(
    () => {
      socketRef.current = io.connect("151.197.236.81:4000")
      socketRef.current.on("message", ({ name, message }) => {
        setChat([...chat, { name, message }])
      })
      return () => socketRef.current.disconnect()
    },
    [chat]
  )

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    const { name, message } = state
    socketRef.current.emit("message", { name, message })
    e.preventDefault()
    setState({ message: "", name })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }


  return (
    <div>
      <div className='multiplayer-base'>
        <div>Multiplayer</div>
        <Button onClick={findMatch} >Find Match</Button>
      </div>

      <div className="card">
        <form onSubmit={onMessageSubmit}>
          <h1>Messenger</h1>
          <div className="name-field">
            <TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
          </div>
          <div>
            <TextField
              name="message"
              onChange={(e) => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
          </div>
          <button>Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Chat Log</h1>
          {renderChat()}
        </div>
      </div>
      
    </div>
  )
}

export default Multiplayer