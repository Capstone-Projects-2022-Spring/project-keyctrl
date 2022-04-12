import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import '../../../styles/MessageContainer.css'
import { Avatar, Badge, TextField } from '@material-ui/core';
import MessageContent from './MessageContent'
import io from "socket.io-client"

const MessageContainer = ({ friendsList, closeMessages, accountInfo, loggedIn }) => {
    const [messagesOpen, setMessagesOpen] = useState(false)
    const [messageSent, setMessageSent] = useState(false)

    const socketRef = useRef()
    useEffect(() => {
        if(loggedIn) {
            if(socketRef.current == null) {
                socketRef.current = io.connect(process.env.REACT_APP_KEYCTRL_MP)
                socketRef.current.emit('joinDefaultRoom', "MSG_"+accountInfo.account_id)
            }
    
            socketRef.current.on('messageSent', function (message, senderID) {
                //Place message contents in senderID's chat box
            })
        }
    }, [messageSent, loggedIn])
    
    function sendMessage() {
        var message = "testMessage" //get message value here
        socketRef.current.emit('sendMessage', 'SenderID', 'Target', message) //add sender and target information here
        setMessageSent(true)
    }

    console.log(friendsList)

    return (
        <div className='mc-container'>
            <div onClick={() => setMessagesOpen((o) => !o)} className='mc-header'>
                <div className='mc-header-text'>Messages</div>
                <div className='mc-icon-wrapper'>
                    <div className='mc-header-icon'>
                        {messagesOpen ?
                            <IoIosArrowDown /> :
                            <IoIosArrowUp />
                        }
                    </div>
                    <div onClick={closeMessages} className='mc-header-icon-close'><MdClose /></div>
                </div>
            </div>
            {messagesOpen ?
                <div className='mc-content'>

                    <div className='mc-content-message-container'>
                        <div className='mc-content-messages'>
                            <MessageContent type={0} name="KeyCtrl" photo={friendsList[0][1].photo} message="Want to hop in a game?" />
                            <MessageContent type={1} name="" message="Yeah give me a few minutes" />
                            <MessageContent type={0} name="KeyCtrl" photo={friendsList[0][1].photo} message="No problem, ill sent an invite in a bit" />
                        </div>
                        <div contenteditable="true" className='mc-content-message-input'>

                        </div>
                    </div>
                    <div className='mc-content-friends'>
                        <div className='mc-friend'>
                            <Badge color="primary" badgeContent={3} >
                                <Avatar
                                    src={friendsList[0][1].photo}
                                    sx={{
                                        width: '3em',
                                        height: '3em',
                                        borderColor: 'var(--selection-color)',
                                        borderStyle: 'solid',
                                        borderWidth: '2px'
                                    }}
                                />
                            </Badge>
                        </div>
                        <div className='mc-friend'>
                            <Badge color="primary" badgeContent={1} >
                                <Avatar
                                    sx={{
                                        width: '3em',
                                        height: '3em',
                                        borderColor: 'var(--text-color)',
                                        borderStyle: 'solid',
                                        borderWidth: '2px'
                                    }}
                                />
                            </Badge>
                        </div>
                        <div className='mc-friend'>
                            <Avatar
                                sx={{
                                    width: '3em',
                                    height: '3em',
                                    borderColor: 'var(--text-color)',
                                    borderStyle: 'solid',
                                    borderWidth: '2px'
                                }}
                            />
                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default MessageContainer