import React from 'react'
import '../../../styles/TitleBar.css'
import { MdRemove, MdCropSquare, MdClose } from 'react-icons/md'

/**
 * @module TitleBar
 * @param {Boolean} loggedIn
 * @param {Function} openSignIn
 * @description Titlebar that is displayed at the very top of the application
 * @returns Component to be displayed
 * @example
 * <TitleBar loggedIn={loggedIn} openSignIn={openSignIn} />
 */

const TitleBar = ({ loggedIn, openSignIn }) => {
    return (
        <div>
            <header className="titlebar">
                <div className="drag-region">

                    <div className="window-controls">

                        {loggedIn ? null :
                            <div onClick={openSignIn} className="login-button">
                                Login
                            </div>
                        }

                    </div>
                </div>
            </header>
        </div>
    )
}

export default TitleBar
