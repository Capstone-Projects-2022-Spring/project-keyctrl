//Modal.js
import React, { useRef } from "react";
import ReactDom from "react-dom";
import '../../styles/Modal.css'
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

const MyTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFormLabel-root': {
    color: 'var(--text-color)'
  },
  '& .MuiFilledInput-root': {
    border: '1px solid transparent',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'var(--dark-bg)',
    color: 'var(--text-color)',
    // '&:hover': {
    //     border: '1px solid var(--selection-color)',
    //     backgroundColor: 'transparent',
    // }
    // },
    // '&.Mui-focused': {
    //     border: '1px solid var(--selection-color)',
    //     backgroundColor: 'transparent',
    //     boxShadow: `var(--dark-bg) 0 0 0 2px`,
    //     borderColor: 'var(--selection-color)',
    // },
  },
}));

export const Modal = ({ setShowModal, setJoinLobby, setLobbyID, setName, name, isFindMatch, cancelFindMatch }) => {

  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
      cancelFindMatch()
    }
  };

  function lobbySubmit() {
    setLobbyID(document.getElementById('lobbyIdInput').value)
    setName(document.getElementById('lobbyNameInput').value)
    setJoinLobby(true)
    setShowModal(false)
  }

  //render the modal JSX in the portal div.
  if (isFindMatch) {
    return ReactDom.createPortal(
      <div className="container" ref={modalRef} onClick={closeModal}>
        <div className="modal">
          <div style={{fontSize: '2em', fontFamily: 'Almarai', paddingBottom: '.5em'}}>
            Finding a Match
          </div>
          <Loader
            type="ThreeDots"
            color="var(--selection-color)"
            height={50}
            width={150}
          />
          <button id="cancelFindMatch" onClick={() => cancelFindMatch()}>Cancel</button>
        </div>
      </div>,
      document.getElementById("portal")
    );
  } else {
    return ReactDom.createPortal(
      <div className="container" ref={modalRef} onClick={closeModal}>
        <div className="modal">
          <MyTextField
            label="Lobby ID"
            id="lobbyIdInput"
            variant="filled"
            sx={{ height: '2em' }}
          />
          <br />
          <MyTextField
            label="Name"
            id="lobbyNameInput"
            variant="filled"
            value={name}
            sx={{ height: '2em' }}
          />
          <button style={{ color: 'var(--dark-bg)' }} id="lobbySubmit" onClick={() => lobbySubmit()}>Submit</button>
        </div>
      </div>,
      document.getElementById("portal")
    );
  }

};