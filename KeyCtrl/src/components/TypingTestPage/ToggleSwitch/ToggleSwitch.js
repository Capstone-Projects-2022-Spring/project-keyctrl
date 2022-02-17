import React from 'react'
import './ToggleSwitch.css'

/**
 * @module ToggleSwitch
 * @param {boolean} countdownToggleChecked
 * @param {Function} onToggle 
 * @description A toggle switch componant to switch between two states
 * @returns ToggleSwitch component
 * 
 */

const ToggleSwitch = ({countdownToggleChecked, onToggle}) => {

    const blah = (e) => {
        console.log("Event: " + e.target.checked)
        console.log("Reality: " + countdownToggleChecked)
        onToggle(e.target.checked)
    }
    return (
        <div className="cd-switch-wrapper">
            <div>
                Countdown
            </div>
            <div className="countdown-switch">
                <div className="text">
                    Off
                </div>
                <div>
                    <label className="switch">
                        <input 
                            type="checkbox"
                            checked={countdownToggleChecked}
                            onChange={e => blah(e)}
                            />
                        <span class="slider"></span>
                    </label>
                </div>
                <div className="text">
                    On
                </div>
            </div>
        </div>
    )
}

export default ToggleSwitch
