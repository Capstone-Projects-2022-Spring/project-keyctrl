/** @jsxImportSource theme-ui */

import { useState, useRef } from 'react'
import styled from 'styled-components';
import Popup from 'reactjs-popup'
import { Avatar, Badge, TextField } from '@material-ui/core';
import '../../../styles/Friend.css'
import { BsThreeDots } from "react-icons/bs"
import { Menu, MenuItem } from '@material-ui/core';
import { blue, green, purple, red } from '@material-ui/core/colors';
import * as api from '../../../utils/apiUtils.js'
import { toast } from 'react-toastify'
import Account from '../../AccountPage/Account'
import Scrollbars from 'react-custom-scrollbars-2'
import passOpenFAccount from '../../../App.js'
import io from "socket.io-client"


const StyledPopup = styled(Popup)`
    
  // use your custom style for ".popup-overlay"
  &-overlay {
    backdrop-filter: blur(10px);
  }
  // use your custom style for ".popup-content"
  &-content {
    padding: 1em;
    background: var(--bg-color);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-style: solid;
    border-color: var(--selection-color);
    color: var(--text-color);
  } 
`;

const DeleteAccount = styled.div`
    height: 3em;
    width: fit fit-content;
    border-radius: 1em;
    border: 1px;
    border-style: solid;
    border-color: var(--text-color);
    font-size: 1em;
    /* background: var(--primary-color); */
    color: var(--text-color); 
    &:hover{
        transition: .25s;
        border-color: var(--warning);
        color: var(--warning);
        cursor: pointer;
    }
`
const ConfirmationButtonYes = styled.div`
    margin-bottom: .5em;
    padding: .5em;
    border: 1px;
    border-style: solid;
    border-color: var(--text-color);
    font-size: 1em;
    /* background: var(--primary-color); */
    color: var(--text-color); 
    &:hover{
        transition: .25s;
        border-color: var(--warning);
        color: var(--warning);
        cursor: pointer;
    }
`

const ConfirmationButtonNo = styled.div`
    padding: .5em;
    border: 1px;
    border-style: solid;
    border-color: var(--selection-color);
    font-size: 1em;
    color: var(--selection-color); 
    &:hover{
        transition: .25s;
        color: var(--bg-color);
         background: var(--selection-color);
        cursor: pointer;
    }
`

const StyledBadge = styled(Badge)(({ status }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    width: '1em',
    height: '1em',
    fontSize: '1em',
    borderRadius: '50%',
    boxShadow: `0 0 0 .2em var(--bg-color)`
  }
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'var(--dark-bg)',
    minWidth: 180,
    color: 'var(--text-color)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: green,
      },
      '&:active': {
        backgroundColor: blue,
      },
    },
  },
}));

const friendProf = ({ }) => {//requests accountInfo from a friend/user then put into Account() 
  //request info using user email being passed in
  //throw info into Account()
}

const Friend = ({ friendsList, setState, setFriendsList, accountInfo, object, openFAccount, setSendInvite, setInviteLobby }) => {//object is current person
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = async (item) => {
    setAnchorEl(null);
    switch(item) {
      case(0):
        openFAccount(object)
        break;
      case(1):
        sendGameInvite()
        break;
      case(2):
        //sendMessage()
        break;
      case(3):
        console.log(accountInfo)
        console.log(object)
        setModalOpen(true)
        break;
      default:
        break;
    }
  };

  const socketRef = useRef()
  function sendGameInvite() {
    //DETERMINE LOBBY ID VIA UI, PLACEHOLDER FOR NOW
    setSendInvite(true)
    var lobbyID = "testingGameInvite"
    if(socketRef.current == null) {
      socketRef.current = io.connect("http://localhost:4000")
    }
    setInviteLobby(lobbyID)
    socketRef.current.emit('sendGameInvite', accountInfo.account_id, object.account_id, lobbyID)
    setSendInvite(false)
  }

  function sendMessage() {
    if(socketRef.current == null) {
      socketRef.current = io.connect("http://localhost:4000")
    }
    var message = "testMessage"
    socketRef.current.emit('sendMessage', accountInfo.display_name, object.account_id, message)
  }

  const deleteFriend = async () => {

    closeModal()

    console.log(friendsList[0]);

    var tempList = friendsList;

    const index = friendsList[0].indexOf(object);

    if (index > -1) {
      tempList[0].splice(index, 1); // 2nd parameter means remove one item only
    }

    console.log(tempList);

    setFriendsList(tempList)
    setState(o => !o);

    toast.error(object.display_name + ' Removed!', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    });

    await api.removeFriend(accountInfo.account_id, accountInfo.social_id, object.social_id)
  }

  return (
    <div>
      <div className='friend-container'>
        <div>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            status={true}
          >
            <Avatar
              src={object.photo}
              sx={{
                width: '3em',
                height: '3em',
                borderColor: 'var(--text-color)',
                borderStyle: 'solid',
                borderWidth: '2px'
              }}
            />
          </StyledBadge>
        </div>
        <div className='friend-username'>
          {object.display_name}
        </div>
        <div className='friend-options-button'>
          <BsThreeDots
            style={{ fontSize: '2em' }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} />

          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            open={open}
            onClose={handleMenuClick}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleMenuClick(0)}>View Profile</MenuItem>
            <MenuItem onClick={() => handleMenuClick(1)}>Invite</MenuItem>
            <MenuItem onClick={() => handleMenuClick(2)}>Message</MenuItem>
            <MenuItem onClick={() => handleMenuClick(3)}>Remove Friend</MenuItem>
          </StyledMenu>
        </div>
      </div>
      <StyledPopup
        open={modalOpen}
        position="center"
        modal
        closeOnDocumentClick
      >
        Are you sure you want to remove
        <br />
        {object.display_name}?
        <div className="delete-account-popup">
          <ConfirmationButtonYes onClick={deleteFriend}>YES, REMOVE</ConfirmationButtonYes>
          <ConfirmationButtonNo onClick={() => setModalOpen(false)}>NO, GO BACK</ConfirmationButtonNo>
        </div>
      </StyledPopup>

    </div>

  )
}

export default Friend