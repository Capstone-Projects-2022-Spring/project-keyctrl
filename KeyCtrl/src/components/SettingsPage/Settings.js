import React from 'react'
import '../../styles/Settings.css'
import ColoredLine from './ColoredLine'
import AccountTile from './AccountTile'
import SettingsLoginTile from './SettingsLoginTile'

/**
 * @module Settings
 * @component Settings
 * @param {Object} accountInfo
 * @param {Function} logout
 * @param {Boolean} loggedIn
 * @description Settings page that is displayed if an account is logged in
 * @returns Component to be displayed
 * @example
 * <Settings accountInfo={accountInfo} logout={logout} loggedIn={loggedIn} />
 */

const Settings = ({ accountInfo, logout, loggedIn }) => {
    return (
        <div className="s-wrapper">

            <div className="s-title">
                Settings
            </div>
            <div className="s-line-spacing">
                <ColoredLine color="#5B5A99" />
            </div>
            {loggedIn ? <AccountTile accountInfo={accountInfo} logout={logout} /> : <SettingsLoginTile />}
            <div className="s-line-spacing">
                <ColoredLine color="#5B5A99" />
            </div>
            <div className="s-section">
                More settings coming soon!
            </div>
        </div>
    )
}

export default Settings
