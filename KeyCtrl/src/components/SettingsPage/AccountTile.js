import React from 'react'
import '../../styles/AccountTile.css'
import { MdAccountBox, MdRemoveRedEye } from 'react-icons/md'

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
            <div className="account-photo">
                <MdAccountBox className="account-icon" />
            </div>
            <div className="account-info">
                <div className="acc-name">ID: {accountInfo.display_name}</div>
                <div className="acc-email">
                    Email: {accountInfo.user_email}
                    </div>
                <div className="acc-email">
                    <div>Password: {accountInfo.password}</div>
                    <MdRemoveRedEye />
                </div>
            </div>
            <div>
                <div onClick={logout} className="logout">
                    Logout
                </div>
            </div>
        </div>
    )
}

export default AccountTile
