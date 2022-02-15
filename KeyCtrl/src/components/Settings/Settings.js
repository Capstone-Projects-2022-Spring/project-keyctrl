import React from 'react'
import './Settings.css'
import ColoredLine from '../ColoredLine/ColoredLine'
import AccountTile from './AccountTile/AccountTile'
import SettingsLoginTile from './SettingsLoginTile/SettingsLoginTile'

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
