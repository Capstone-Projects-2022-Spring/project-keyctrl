/** @jsxImportSource theme-ui */

import { useState } from 'react'
import styled from 'styled-components';
import Popup from 'reactjs-popup'
import { Avatar, Badge, TextField } from '@material-ui/core';
import '../../../styles/Friend.css'
import { BsThreeDots } from "react-icons/bs"
import { Menu, MenuItem } from '@material-ui/core';
import { blue, green, purple, red } from '@material-ui/core/colors';
import * as api from '../../../utils/apiUtils.js'

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

const Friend = ({ accountInfo, imageUrl, username, status, socialId }) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (item) => {
    setAnchorEl(null);
    if (item === 3) {
      setModalOpen(true)
    }
  };

  const deleteFriend = () => {
    api.removeFriend(accountInfo.account_id, accountInfo.social_id, socialId)
    closeModal()
  }

  return (
    <div>
      <div className='friend-container'>
        <div>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            status={status}
          >
            <Avatar
              src={imageUrl}
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
          {username}
        </div>
        <div className='friend-options-button'>
          <BsThreeDots
            style={{fontSize: '2em' }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} />

          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleClose(0)}>View Profile</MenuItem>
            <MenuItem onClick={() => handleClose(1)}>Invite</MenuItem>
            <MenuItem onClick={() => handleClose(2)}>Message</MenuItem>
            <MenuItem onClick={() => handleClose(3)}>Remove Friend</MenuItem>
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
        {username}?
        <div className="delete-account-popup">
          <ConfirmationButtonYes onClick={deleteFriend}>YES, REMOVE</ConfirmationButtonYes>
          <ConfirmationButtonNo onClick={() => setModalOpen(false)}>NO, GO BACK</ConfirmationButtonNo>
        </div>

      </StyledPopup>
    </div>
  )
}

export default Friend