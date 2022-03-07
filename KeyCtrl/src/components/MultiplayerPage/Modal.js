//Modal.js
import React, { useRef } from "react";
import ReactDom from "react-dom";
export const Modal = ({ setShowModal, setJoinLobby, setLobbyID }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  function lobbySubmit() {
    setLobbyID(document.getElementById('lobbyIdInput').value)
    setJoinLobby(true)
    setShowModal(false)
  }

  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <h2>Enter a Lobby ID</h2>
        <input id="lobbyIdInput"></input>
        <button id="lobbySubmit" onClick={() => lobbySubmit()}>Submit</button>
        <button onClick={() => setShowModal(false)}>X</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};