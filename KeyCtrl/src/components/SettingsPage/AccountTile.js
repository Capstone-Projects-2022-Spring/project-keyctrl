/** @jsxImportSource theme-ui */

import React from 'react'
import '../../styles/AccountTile.css'
import { MdDeleteForever } from 'react-icons/md'
import Image from "../../assets/colin-profile.png"
import { Avatar } from '@material-ui/core'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import * as api from '../../utils/apiUtils.js'
import { toast } from 'react-toastify'
import { AiTwotoneEdit } from 'react-icons/ai'
import { Tooltip, TextField } from '@material-ui/core'
import { FacebookShareButton, FacebookIcon } from 'react-share'
import { useState } from 'react'

/**
 * @module AccountTile
 * @param {Object} accountInfo
 * @param {Function} logout
 * @description Display of basic account info in a single tile
 * @returns Component to be displayed
 * @example
 * <AccountTile accountInfo={accountInfo} logout={logout} />
 */

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
    font-size: 3.5em;
    height: 3.5em;
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

const AccountTile = ({ setAccountInfo, accountInfo, logout }) => {
    const [usernameModalOpen, setUsernameModalOpen] = useState(false)
    const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)

    const handleUsernameClose = () => {
        setUsernameModalOpen(false)
    }
    const handleDeleteAccountClosed = () => {
        setDeleteAccountModalOpen(false)
    }

    const deleteAccount = () => {
        api.deleteAccount(accountInfo.account_id)
        logout()

        toast.success('Account successfully deleted', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        });
    }

    function onUsernameChange() {
        var newName = document.getElementById('newName').value.toString()

        console.log(newName)
        if(newName === "")
            alert("Username cannot be blank")
        else if(newName.length > 14)
            alert("Username must be less than 15 characters")
        else{
            var socialNumber = accountInfo.social_id.substr(accountInfo.social_id.length - 4)
            var newSocialId = newName + socialNumber
            var newSocialId = newSocialId.replace(/\s+/g, '')
            api.changeUsername(accountInfo.account_id, newSocialId, newName)
            var tempAccountInfo = accountInfo
            tempAccountInfo.display_name = newName
            setAccountInfo(tempAccountInfo)
            setUsernameModalOpen(false)
        }
    }

    return (

        <div className="base">
            <Avatar
                src={accountInfo.photo}
                sx={{
                    height: '10em',
                    width: '10em',
                    borderColor: 'var(--text-color)',
                    borderStyle: 'solid',
                    borderWidth: '2px'
                }}
            />

            {/* <FacebookShareButton
                url={"https://imgur.com/gallery/eGPVMcQ"}
                quote={"CampersTribe - World is yours to explore"}
                hashtag="#camperstribe"
                >
                <FacebookIcon size={36} />
            </FacebookShareButton> */}

            <div className="account-info">
                <div className="acc-name">
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ paddingRight: '1em' }}>
                            {accountInfo.display_name}
                        </div>
                        <Tooltip title="Edit Display Name">
                            <div className="edit-button">
                                <AiTwotoneEdit onClick={() => setUsernameModalOpen(true)} />
                            </div>
                        </Tooltip>
                    </div>
                    {"#" + accountInfo.social_id.substr(accountInfo.social_id.length - 4)}
                </div>

            </div>

             <DeleteAccount>
                        <MdDeleteForever onClick={() => setDeleteAccountModalOpen(true)} />
                    </DeleteAccount>

            <StyledPopup
                open={usernameModalOpen}
                position="center"
                modal
                closeOnDocumentClick
                onClose={handleUsernameClose}
            >
                <MyTextField
                    label="New Display Name"
                    id="newName"
                    variant="filled"
                    sx={{ height: '3em' }}
                />
                <br />
                <ConfirmationButtonNo onClick={onUsernameChange}>Save</ConfirmationButtonNo>
            </StyledPopup>

            <StyledPopup
                open={deleteAccountModalOpen}
                position="center"
                modal
                closeOnDocumentClick
                onClose={handleDeleteAccountClosed}
            >
                Are you sure you want to delete your account?
                <br />
                This action is irreversible
                <div className="delete-account-popup">
                    <ConfirmationButtonYes onClick={deleteAccount}>YES, DELETE MY ACCOUNT</ConfirmationButtonYes>
                    <ConfirmationButtonNo onClick={handleDeleteAccountClosed}>NO, GO BACK</ConfirmationButtonNo>
                </div>

            </StyledPopup>
        </div>
    )
}

export default AccountTile
