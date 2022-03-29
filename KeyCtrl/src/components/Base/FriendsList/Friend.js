/** @jsxImportSource theme-ui */

import { useState } from 'react'
import styled from 'styled-components';
import { Avatar, Badge, TextField } from '@material-ui/core';
import '../../../styles/Friend.css'
import { BsThreeDots } from "react-icons/bs"
import { Menu, MenuItem } from '@material-ui/core';
import { blue, green, purple, red } from '@material-ui/core/colors';

const StyledBadge = styled(Badge)(({ status }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: status ? '#44b700' : "#e01e37",
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

const Friend = ({ imageUrl, username, status }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Invite</MenuItem>
                        <MenuItem onClick={handleClose}>Message</MenuItem>
                        <MenuItem onClick={handleClose}>Remove Friend</MenuItem>
                    </StyledMenu>
                </div>
            </div>
        </div>
    )
}

export default Friend