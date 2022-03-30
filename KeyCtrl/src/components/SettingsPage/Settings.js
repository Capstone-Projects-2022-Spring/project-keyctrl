import React from 'react'
import '../../styles/Settings.css'
import ColoredLine from './ColoredLine'
import AccountTile from './AccountTile'
import SettingsLoginTile from './SettingsLoginTile'
import ThemeSelect from './ThemeSelect'
import * as api from '../../utils/apiUtils.js'

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

const Settings = ({ accountInfo, logout, loggedIn, setShowThemeOptions }) => {

    const updateOptions = (theme) => {
        if (loggedIn) {
            api.updateOptions(accountInfo.account_id, theme)
        }
    }

    return (
        <div className="s-wrapper">

            <div className="s-title">
                Settings
            </div>
            <div className="s-line-spacing">
                <ColoredLine
                    color="var(--primary-color)"
                    width='100%'
                />
            </div>
            {loggedIn ? <AccountTile accountInfo={accountInfo} logout={logout} /> : <SettingsLoginTile />}
            <div className="s-line-spacing">
                <ColoredLine
                    color="var(--primary-color)"
                    width='100%' />
            </div>
            <div className="sub">
                Preferences
            </div>
            <div className="s-section">
                <ThemeSelect updateOptions={updateOptions} setShowThemeOptions={setShowThemeOptions} />
            </div>
        </div>
    )
}

export default Settings
