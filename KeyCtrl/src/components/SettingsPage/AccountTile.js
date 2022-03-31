/** @jsxImportSource theme-ui */

import React from 'react'
import '../../styles/AccountTile.css'
import { MdAccountBox, MdRemoveRedEye } from 'react-icons/md'
import Image from "../../assets/colin-profile.png"
import { Avatar } from '@material-ui/core'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import * as api from '../../utils/apiUtils.js'
import { toast } from 'react-toastify'

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

const AccountTile = ({ accountInfo, logout }) => {
    console.log("ac: " + accountInfo);

    const deleteAccount = () => {
        api.deleteAccount(accountInfo.account_id)
        logout()

    toast.success('Account successfully deleted' , {
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

            <div className="account-info">
                <div className="acc-name">{accountInfo.display_name}</div>
            </div>

            <StyledPopup
                trigger={<DeleteAccount>Delete Account</DeleteAccount>}
                position="center"
                modal
                closeOnDocumentClick
            >
                Are you sure you want to delete your account?
                <br />
                This action is irreversible
                <div className="delete-account-popup">
                    <ConfirmationButtonYes onClick={deleteAccount}>YES, DELETE MY ACCOUNT</ConfirmationButtonYes>
                    <ConfirmationButtonNo>NO, GO BACK</ConfirmationButtonNo>
                </div>

            </StyledPopup>
        </div>
    )
}

export default AccountTile
