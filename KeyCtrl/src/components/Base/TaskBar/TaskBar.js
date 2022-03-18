import React from 'react'
import '../../../styles/TaskBar.css'
import { MdAccountCircle, MdSettings, MdKeyboard, MdFitnessCenter, MdPublic } from "react-icons/md"
import { Link } from 'react-router-dom'
import ColoredLine from '../../SettingsPage/ColoredLine'
import { IoIosPeople } from "react-icons/io"
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

/**
 * @module TaskBar
 * @param {Number} page
 * @param {Function} setPage
 * @description TaskBar that is is fixed to the leftmost portion of application
 * @returns Component to be displayed
 * @example
 * <TaskBar page={page} setPage={setPage} />
 */

const TaskBar = ({ page, setPage, loggedIn, setShowFriendList, showFriendList }) => {
   
    const location = useLocation();

    return (
        <div className="tb-wrapper">
            <div className="top-group">
                <Link to="/project-keyctrl">
                    <MdKeyboard style={location.pathname === "/project-keyctrl" ? { color: 'var(--selection-color)', filter: 'drop-shadow(0px 0px 8px var(--selection-color)' } : null} className='tb-button' />
                </Link>
                <Link to="/training">
                    <MdFitnessCenter  style={location.pathname === "/training" ? { color: 'var(--selection-color', filter: 'drop-shadow(0px 0px 8px var(--selection-color)' } : null} className='tb-button' />
                </Link>
                <Link to="/multiplayer">
                    <MdPublic  style={location.pathname === "/multiplayer" ? { color: 'var(--selection-color', filter: 'drop-shadow(0px 0px 8px var(--selection-color)' } : null} className='tb-button' />
                </Link>
                {loggedIn ?
                    <div>
                        <ColoredLine color="var(--primary-color)" width='70%' />
                        <div>
                            <IoIosPeople onClick={() => setShowFriendList(true)} style={ showFriendList ? { color: 'var(--selection-color', filter: 'drop-shadow(0px 0px 8px var(--selection-color)' } : null} className='tb-button' />
                        </div>
                    </div>
                    : null}

            </div>
            <div className="bottom-group">
                <Link to="account">
                    <MdAccountCircle style={location.pathname === "/account" ? { color: 'var(--selection-color', filter: 'drop-shadow(0px 0px 8px var(--selection-color)' } : null} className="tb-button" />
                </Link>
                <Link to="settings">
                    <MdSettings style={location.pathname === "/settings" ? { color: 'var(--selection-color', filter: 'drop-shadow(0px 0px 8px var(--selection-color)' } : null} className="tb-button" />
                </Link>
            </div>
        </div>
    )
}

TaskBar.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func,
    loggedIn: PropTypes.bool,
    setShowFriendList: PropTypes.func,
    showFriendList: PropTypes.bool
}

export default TaskBar
