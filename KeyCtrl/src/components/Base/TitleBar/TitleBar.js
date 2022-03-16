import React from 'react'
import '../../../styles/TitleBar.css'
import { MdRemove, MdCropSquare, MdClose } from 'react-icons/md'
import '../../../styles/TaskBar.css'
import { MdAccountCircle, MdSettings, MdKeyboard, MdFitnessCenter, MdPublic } from "react-icons/md"
import { Link } from 'react-router-dom'
import ColoredLine from '../../SettingsPage/ColoredLine'
import { IoIosPeople } from "react-icons/io"
import PropTypes from 'prop-types'

/**
 * @module TitleBar
 * @param {Boolean} loggedIn
 * @param {Function} openSignIn
 * @description Titlebar that is displayed at the very top of the application
 * @returns Component to be displayed
 * @example
 * <TitleBar loggedIn={loggedIn} openSignIn={openSignIn} />
 */

const TitleBar = ({ page, setPage, loggedIn, setShowFriendList, showFriendList, openSignIn }) => {
    return (
        <div>
            <header className="titlebar">
                <div className="drag-region">

                    <div className="tb-wrapper">
                        <div className='title'>
                            KeyCtrl
                        </div>
                        <div className="top-group">
                            <Link to="/project-keyctrl">
                                <MdKeyboard onClick={() => setPage(0)} style={page === 0 ? { color: 'var(--selection-color)', backgroundColor: 'var(--bg-color)' } : null} className='tb-button' />
                            </Link>
                            <Link to="/training">
                                <MdFitnessCenter onClick={() => setPage(2)} style={page === 2 ? { color: 'var(--selection-color', backgroundColor: 'var(--bg-color)' } : null} className='tb-button' />
                            </Link>
                            <Link to="/multiplayer">
                                <MdPublic onClick={() => setPage(3)} style={page === 3 ? { color: 'var(--selection-color', backgroundColor: 'var(--bg-color)' } : null} className='tb-button' /> 
                            </Link>
                            <Link to="account">
                                <MdAccountCircle onClick={() => setPage(1)} style={page === 1 ? { color: 'var(--selection-color', backgroundColor: 'var(--bg-color)' } : null} className="tb-button" />
                            </Link>
                            <Link to="settings">
                                <MdSettings onClick={() => setPage(4)} style={page === 4 ? { color: 'var(--selection-color', backgroundColor: 'var(--bg-color)' } : null} className="tb-button" />
                            </Link>
                            {loggedIn ?
                                <div>
                                    <ColoredLine color="var(--primary-color)" width='70%' />
                                    <div>
                                        <IoIosPeople onClick={() => setShowFriendList(true)} style={showFriendList ? { color: 'var(--selection-color', backgroundColor: 'var(--bg-color)' } : null} className='tb-button' />
                                    </div>
                                </div>
                                : null}

                        </div>
                    </div>

                    {/* <div className="window-controls">

                        {loggedIn ? null :
                            <div onClick={openSignIn} className="login-button">
                                Login
                            </div>
                        }
                        , filter: 'drop-shadow(0px 0px 8px var(--selection-color)'

                    </div> */}
                </div>
            </header>
        </div>
    )
}

export default TitleBar
