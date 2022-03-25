/** @jsxImportSource theme-ui */

import React from 'react'
import '../../styles/AccountTile.css'
import { MdAccountBox, MdRemoveRedEye } from 'react-icons/md'
import Image from "../../assets/colin-profile.png"
import { Avatar } from '@material-ui/core'

/**
 * @module AccountTile
 * @param {Object} accountInfo
 * @param {Function} logout
 * @description Display of basic account info in a single tile
 * @returns Component to be displayed
 * @example
 * <AccountTile accountInfo={accountInfo} logout={logout} />
 */


const AccountTile = ({ accountInfo, logout }) => {
    console.log("ac: " + accountInfo);

    return (

        <div className="base">
            <Avatar
                src={Image}
                sx={{
                    height: '10em',
                    width: '10em',
                    borderColor: 'var(--text-color)',
                    borderStyle: 'solid',
                    borderWidth: '2px'
                }}
            />

            <div className="account-info">
                <div className="acc-name">Colin Harker</div>
            </div>
        </div>
    )
}

export default AccountTile
