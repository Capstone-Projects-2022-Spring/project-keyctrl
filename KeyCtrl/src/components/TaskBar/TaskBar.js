import React from 'react'
import './TaskBar.css'
import { MdAccountCircle, MdSettings, MdKeyboard, MdFitnessCenter } from "react-icons/md"
import { Link } from 'react-router-dom'

const TaskBar = ({ page, setPage }) => {
    return (
        <div className="tb-wrapper">
            <div className="top-group">
                <Link to="/typing-test">
                    <MdKeyboard onClick={() => setPage(0)} style={page === 0 ? { color: '#50E3C2', filter: 'drop-shadow(0px 0px 8px #50E3C2)' } : null} className='tb-button' />
                </Link>
                <Link to="/training">
                    <MdFitnessCenter onClick={() => setPage(2)} style={page === 2 ? { color: '#50E3C2', filter: 'drop-shadow(0px 0px 8px #50E3C2)' } : null} className='tb-button' />
                </Link>

            </div>
            <div className="bottom-group">
                <Link to="account">
                    <MdAccountCircle onClick={() => setPage(1)} style={page === 1 ? { color: '#50E3C2', filter: 'drop-shadow(0px 0px 8px #50E3C2)' } : null} className="tb-button" />
                </Link>
                <Link to="settings">
                    <MdSettings onClick={() => setPage(4)} style={page === 4 ? { color: '#50E3C2', filter: 'drop-shadow(0px 0px 8px #50E3C2)' } : null} className="tb-button" />
                </Link>
            </div>
        </div>
    )
}

export default TaskBar
