import React, { createRef, useEffect } from 'react'
import { useState, useRef } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdClose } from 'react-icons/md'
import '../../../styles/MessageContainer.css'
import { Avatar, Badge, TextField } from '@material-ui/core';
import MessageContent from './MessageContent'
import io from "socket.io-client"
import Scrollbars from 'react-custom-scrollbars-2'

const MessageContainer = ({ update, sendMessage, messageSent, setMessageSent, currentMessageIndex, setCurrentMessageIndex, messages, setMessages, setMessagesRendered, friendsList, accountInfo, loggedIn }) => {
    const [messagesOpen, setMessagesOpen] = useState(true)

    const scrollbars = createRef()

    useEffect(() => {
        if (messages.length != 0) {
            scrollbars.current.scrollToBottom()
        }
    }, [])


    useEffect(() => {
        if (messages.length != 0) {
            scrollbars.current.scrollToBottom()
        }
    }, [update])



    useEffect(() => {

        document.addEventListener('keydown', onKeyPress);

        document.getElementById('mc-message-content').addEventListener('keypress', (evt) => {
            if (evt.key === "Enter") {
                evt.preventDefault();
            }
        });


        return () => {
            document.removeEventListener('keydown', onKeyPress);
        };
    }, [])

    const onKeyPress = (event) => {

        switch (event.key) {

            case "Enter":
                var message = document.getElementById("mc-message-content").innerHTML
                console.log(message)

                if (message !== "") {
                    sendMessage(message)
                }

                document.getElementById("mc-message-content").innerHTML = ""
                break;
        }
    }

    const closeMessages = () => {
        setMessagesRendered(false)
    }

    const updateIndex = (index) => {
        setCurrentMessageIndex(index)
    }

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
                            {messages.length == 0 ? null :
                                <Scrollbars ref={scrollbars} autoHeight autoHeightMin={'20em'}>
                                    {messages[currentMessageIndex].messages.map(function (object, index) {
                                        var type = object.name == accountInfo.display_name ? 1 : 0
                                        
                                        return (
                                            <MessageContent type={type} photo={object.photo} name={object.name} message={object.message} />
                                        )
                                    })}
                                </Scrollbars>
                            }
                        </div>
                        <div id="mc-message-content" contentEditable="true" className='mc-content-message-input'>
                        </div>
                    </div>
                    <div className='mc-content-friends'>

                        {messages.map(function (object, index) {
                            return (
                                <div onClick={() => updateIndex(index)} className='mc-friend'>
                                    <Badge color="primary" badgeContent={0} >
                                        <Avatar
                                            src={object.player.photo}
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
                            )
                        })}


                    </div>
                </div>
                : null}
        </div>
    )
}

export default MessageContainer