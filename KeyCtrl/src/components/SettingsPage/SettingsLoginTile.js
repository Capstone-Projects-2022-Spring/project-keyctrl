import React from 'react'
import '../../styles/SettingsLoginTile.css'
import { MdLock } from 'react-icons/md'
import googleBtn from '../../utils/googleUtils'
/**
 * @module SettingsLoginTile
 * @component SettingsLoginTile
 * @description Tile to be displayed in the settings page if not logged in
 * @returns Component to be displayed
 * @example
 * <SettingsLoginTile />
 */

 const responseGoogle = response => {
    console.log(response);
};

const SettingsLoginTile = () => {
    return (
        <div className="slt-wrapper">
            <MdLock style={{ color: '50E3C2', padding: '1em' }} />
            <div className="slt-text">
                Login to view account settings
                <googleBtn/>
            </div>
        </div>
    )
}

export default SettingsLoginTile
