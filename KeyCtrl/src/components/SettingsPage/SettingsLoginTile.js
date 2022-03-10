import React from 'react'
import '../../styles/SettingsLoginTile.css'
import { MdLock } from 'react-icons/md'
/**
 * @module SettingsLoginTile
 * @component SettingsLoginTile
 * @description Tile to be displayed in the settings page if not logged in
 * @returns Component to be displayed
 * @example
 * <SettingsLoginTile />
 */


const SettingsLoginTile = () => {
    return (
        <div className="slt-wrapper">
            <MdLock style={{color: 'var(--selection-color)', padding: '1em'}}/>
            <div className="slt-text">
                Login to view account settings
            </div>
        </div>
    )
}

export default SettingsLoginTile
