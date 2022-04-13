import React from 'react'
import '../../../styles/MessageContainer.css'
import { Avatar } from '@material-ui/core';

const MessageContent = ({ type, photo, name, message }) => {
    console.log(photo)
    return (
        <div className='message-container'>
            {type == 0 ?
                <div className='message-friend-container'>
                    <Avatar
                        src={photo}
                        sx={{
                            width: '.em',
                            height: '.5em',
                            borderColor: 'var(--text-color)',
                            borderStyle: 'solid',
                            borderWidth: '2px'
                        }}
                    />

                    <div className='message-friend-content'>
                        <div className='message-friend-name'>{name}</div>
                        <div className='message-friend'>{message}</div>
                    </div>
                </div>
                :
                <div className='message-response'>
                    {message}
                </div>
            }
        </div>
    )
}

export default MessageContent