import { React, useState } from 'react'
import '../../../styles/TitleBar.css'
import { MdRemove, MdCropSquare, MdClose } from 'react-icons/md'
import '../../../styles/TaskBar.css'
import { MdAccountCircle, MdSettings, MdKeyboard, MdFitnessCenter, MdPublic } from "react-icons/md"
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io"
import { FiLogIn, FiLogOut } from "react-icons/fi"
import { Avatar, Tooltip, Badge } from "@material-ui/core"
import { FaUserFriends } from "react-icons/fa"

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

const TitleBar = ({ setState, page, setPage, loggedIn, logout, setShowFriendList, showFriendList, openSignIn }) => {
    const [count, setCount] = useState(1);

    return (
        <div>
            <header className="titlebar">
                <div className="drag-region">

                    <div className="tb-wrapper">
                        <div className='title'>
                            KeyCtrl
                        </div>
                        <div className="top-group">
                            {/* <Link to="/training">
                                <MdFitnessCenter onClick={() => setPage(2)} style={page === 2 ? { color: 'var(--selection-color', backgroundColor: 'var(--bg-color)' } : null} className='tb-button' />
                            </Link> */}
                            <Tooltip title="Account" arrow>
                                <Link to="account">
                                    <MdAccountCircle onClick={() => setPage(1)} style={page === 1 ? { color: 'var(--selection-color', backgroundColor: 'var(--bg-color)' } : null} className="tb-button" />
                                </Link>
                            </Tooltip>

                            <Tooltip title="Multiplayer" arrow>
                                <Link to="multiplayer">
                                    <MdPublic onClick={() => setPage(3)} style={page === 3 ? { color: 'var(--selection-color', backgroundColor: 'var(--bg-color)' } : null} className='tb-button' />
                                </Link>
                            </Tooltip>

                            <Tooltip title="Typing Test" arrow>
                                <Link to="">
                                    <MdKeyboard onClick={() => setPage(0)} style={page === 0 ? { color: 'var(--selection-color)', backgroundColor: 'var(--bg-color)' } : null} className='tb-button' />
                                </Link>
                            </Tooltip>

                            <Tooltip title="Settings" arrow>
                                <Link to="settings">
                                    <MdSettings onClick={() => setPage(4)} style={page === 4 ? { color: 'var(--selection-color', backgroundColor: 'var(--bg-color)' } : null} className="tb-button" />
                                </Link>
                            </Tooltip>

                            <Tooltip title={loggedIn ? "Logout" : "Login"} arrow>
                                    {loggedIn ?
                                        <FiLogOut className='tb-button' onClick={logout} />
                                        :
                                        <FiLogIn className='tb-button' onClick={openSignIn} />
                                    }
                            </Tooltip>

                            {loggedIn ?
                                <Tooltip title="Friends List" arrow>
                                    <div onClick={() => setState({ isPaneOpen: true })} className='friends-list-popup-button'>
                                        <IoIosArrowBack style={{ fontSize: '1.25em' }} />
                                        {/* <Badge color="primary" badgeContent={count} > */}
                                            <FaUserFriends style={{ fontSize: '1.75em' }}/>
                                        {/* </Badge> */}
                                    </div>
                                </Tooltip>
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
