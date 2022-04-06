//Modal.js
import React, { useRef } from "react";
import ReactDom from "react-dom";
export const Modal = ({ setShowModal, setJoinLobby, setLobbyID, setName, name, isFindMatch, cancelFindMatch, isRanked, cancelFindRanked }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  function lobbySubmit() {
    setLobbyID(document.getElementById('lobbyIdInput').value)
    setName(document.getElementById('lobbyNameInput').value)
    setJoinLobby(true)
    setShowModal(false)
  }

  //render the modal JSX in the portal div.
  if(isFindMatch) {
    return ReactDom.createPortal(
      <div className="container" ref={modalRef} onClick={closeModal}>
        <div className="modal">
          <h2>Finding a Match...</h2>
          <button id="cancelFindMatch" onClick={() => cancelFindMatch()}>Cancel</button>
        </div>
      </div>,
      document.getElementById("portal")
    );
  } else if (isRanked) {
    return ReactDom.createPortal(
      <div className="container" ref={modalRef} onClick={closeModal}>
        <div className="modal">
          <h2>Finding a Match...</h2>
          <button id="cancelFindRanked" onClick={() => cancelFindRanked()}>Cancel</button>
        </div>
      </div>,
      document.getElementById("portal")
    );
  } else {
    return ReactDom.createPortal(
      <div className="container" ref={modalRef} onClick={closeModal}>
        <div className="modal">
          <h2>Enter a Lobby ID</h2>
          <input id="lobbyIdInput"></input>
          <h2>Name</h2>
          <input id="lobbyNameInput" value={name}></input>
          <button id="lobbySubmit" onClick={() => lobbySubmit()}>Submit</button>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
 
};