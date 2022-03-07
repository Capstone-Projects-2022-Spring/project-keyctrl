import React, { useEffect, useRef, useState, useParams } from "react"
import io from "socket.io-client"
import TextField from "@material-ui/core/TextField"

export const Lobby = (props) => {
    var lobbyID = props.lobbyID
    const [state, setState] = useState({ message: "", name: "" })
    const [chat, setChat] = useState([])
  
    const socketRef = useRef()
  
    useEffect(
      () => {
        socketRef.current = io.connect("http://localhost:4000")
        socketRef.current.emit("switchLobby", { lobbyID })
        socketRef.current.on('updateLobby', function(newLobby) {
            socketRef.current.room = newLobby;
          });
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
      socketRef.current.emit("message", { name, message }, socketRef.current.room)
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
      <div className="card">
          <form onSubmit={onMessageSubmit}>
            <h1>Lobby ID: {lobbyID}</h1>
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
    )
  }