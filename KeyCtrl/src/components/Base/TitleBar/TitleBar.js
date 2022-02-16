import React from 'react'
import './TitleBar.css'
import { MdRemove, MdCropSquare, MdClose } from 'react-icons/md'

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
