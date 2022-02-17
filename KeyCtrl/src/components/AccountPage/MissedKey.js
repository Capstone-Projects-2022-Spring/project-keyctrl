import React from 'react'
import '../../styles/MissedKey.css'

/**
 * @module MissedKey
 * @param {Number} letter_misses
 * @description Tile to show when hovered over keyboard letter to show number of specific misses
 * @returns Component to be displayed
 * @example
 * <MissedKey letter_misses={letter_misses} />
 */

const MissedKey = ({letter_misses}) => {
    return (
        <div className="mk-base">
            <div>Times Missed</div>
            <div>{letter_misses}</div>
        </div>
    )
}

export default MissedKey
