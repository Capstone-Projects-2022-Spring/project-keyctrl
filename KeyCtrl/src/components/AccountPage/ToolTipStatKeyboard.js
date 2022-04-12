import React from 'react'

const ToolTipStatKeyboard = ({keyboardDisplay, letter, param1, param2}) => {
    return (
        <>
            Letter: {letter}
            <br />
            {keyboardDisplay == 0 ? "Missed " + param1 + " times" :
                "Missed " + param1 + "% of the time"}
        </>
    )
}

export default ToolTipStatKeyboard