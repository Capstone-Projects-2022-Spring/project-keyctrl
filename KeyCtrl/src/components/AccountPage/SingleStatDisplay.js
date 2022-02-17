import React from 'react'
import "../../styles/SingleStatDisplay.css"

/**
 * @module SingleStatDisplay
 * @param {String} title
 * @param {Number} data
 * @description Single tile to display a piece of data and its title
 * @returns Component to be displayed
 * @example
 * <SingleStatDisplay title="Top WPM" data={accountInfo.top_wpm == null ? 0 : Number(accountInfo.top_wpm).toFixed(2)
 */

const SingleStatDisplay = ({title, data}) => {
    return (
        <div className="ssd-base">
            <div className="title">
                {title}
            </div>
            <div className="data">
                {data}
            </div>
        </div>
    )
}

export default SingleStatDisplay
