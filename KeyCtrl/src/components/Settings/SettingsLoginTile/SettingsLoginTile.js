import React from 'react'
import './SettingsLoginTile.css'
import { MdLock } from 'react-icons/md'

const SettingsLoginTile = () => {
    return (
        <div className="slt-wrapper">
            <MdLock style={{color: '50E3C2', padding: '1em'}}/>
            <div className="slt-text">
                Login to view account settings
            </div>
        </div>
    )
}

export default SettingsLoginTile
