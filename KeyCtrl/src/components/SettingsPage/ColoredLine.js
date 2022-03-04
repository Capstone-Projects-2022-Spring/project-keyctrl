import React from 'react'
import PropTypes from 'prop-types'

/**
 * @module ColoredLine
 * @param {String} color
 * @description A styled line that can change color
 * @returns Component to be displayed
 * @example
 * <ColoredLine color="#5B5A99" />
 */

const ColoredLine = ({ color, width }) => {
    return (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 1,
                width: width,
                border: 'none',
            }}
        />
    )
}

ColoredLine.propTypes = {
    color: PropTypes.string,
    width: PropTypes.string
}

export default ColoredLine
