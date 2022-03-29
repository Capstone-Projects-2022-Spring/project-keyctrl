import React from 'react'
import { Avatar, Badge, TextField } from '@material-ui/core';
import '../../../styles/Friend.css'
import { AiOutlineCheckCircle } from "react-icons/ai"
import { MdOutlineCancel } from 'react-icons/md';
import { Tooltip } from '@material-ui/core';

const FriendRequest = ({ object }) => {
    return (
        <div>
            <div className='friend-request-container'>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <Avatar
                            src={object.photo}
                            sx={{
                                width: '3em',
                                height: '3em',
                                borderColor: 'var(--text-color)',
                                borderStyle: 'solid',
                                borderWidth: '2px'
                            }}
                        />
                    </div>
                    <div className='friend-request-username'>
                        {object.display_name}
                    </div>
                </div>
                <div className='friend-request-button-container'>
                    <Tooltip title="Accept" arrow>
                        <div className='friend-request-button'>
                            <AiOutlineCheckCircle />
                        </div>
                    </Tooltip>
                    <Tooltip title="Decline" arrow>
                        <div className='friend-request-button'>
                            <MdOutlineCancel />
                        </div>
                    </Tooltip>
                </div>

            </div>
        </div>
    )
}

export default FriendRequest