import React from 'react'
import '../../styles/AccountTile.css'
import { MdAccountBox, MdRemoveRedEye } from 'react-icons/md'
import Image from "../../assets/colin-profile.png"

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
                 <img src={Image} />
            </div>
            <div className="account-info">
                <div className="acc-name">Colin Harker</div>
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
