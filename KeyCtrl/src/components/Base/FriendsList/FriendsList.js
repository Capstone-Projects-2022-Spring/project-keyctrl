/** @jsxImportSource theme-ui */

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Avatar, Badge, TextField, Paper, IconButton } from '@material-ui/core';
import '../../../styles/FriendsList.css'
import { MdPersonAdd } from 'react-icons/md'
import Image from "../../../assets/colin-profile.png"
import Friend from './Friend';
import { callAddFriend } from '../../../utils/apiUtils';
import sha256 from 'crypto-js/sha256';
import * as api from '../../../utils/apiUtils.js'
import { IoNotificationsSharp } from 'react-icons/io5'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import FriendRequest from './FriendRequest';
import { toast } from 'react-toastify'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        width: '1.5em',
        height: '1.5em',
        fontSize: '1em',
        borderRadius: '50%',
        boxShadow: `0 0 0 .3em var(--bg-color)`
    }
}));

const MyTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '& .MuiFormLabel-root': {
        color: 'var(--text-color)'
    },
    '& .MuiFilledInput-root': {
        border: '1px solid transparent',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: 'var(--dark-bg)',
        color: 'var(--text-color)',
        // '&:hover': {
        //     border: '1px solid var(--selection-color)',
        //     backgroundColor: 'transparent',
        // }
        // },
        // '&.Mui-focused': {
        //     border: '1px solid var(--selection-color)',
        //     backgroundColor: 'transparent',
        //     boxShadow: `var(--dark-bg) 0 0 0 2px`,
        //     borderColor: 'var(--selection-color)',
        // },
    },
}));
function changeStat(current) {
    switch (current) {
        case "Online":
            console.log('STATUS CHANGED FROM ONLINE TO AWAY');
            alert(`STATUS CHANGED FROM ONLINE TO AWAY`);
            break;
        case "Away":
            console.log('STATUS CHANGED FROM AWAY TO ONLINE');
            alert(`STATUS CHANGED FROM AWAY TO ONLINE`);
            break;
        default:
            console.log(`Sorry, something went wrong`);
    }
}

const FriendsList = ({addFriend, setAddFriend, handleAddFriend, currentMessageIndex, setCurrentMessageIndex, messages, setMessages, setMessagesOpen, setOpenFriendList, setFriendsList, friendsList, accountInfo, openFAccount, setSendInvite, setInviteLobby, lobbyID }) => {

    const [count, setCount] = useState(0);
    const [friendRequestsOpen, setFriendRequestsOpen] = useState(true)
    const [friendListOpen, setFriendListOpen] = useState(true)

    const [state, setState] = useState(false)

    useEffect(() => {
        // Update Page
    }, [state])

    useEffect(() => {
        updateFriendsList()
    }, [])

    const updateFriendsList = async () => {
        var tempFL = await api.getFriends(accountInfo.account_id, accountInfo.social_id);
        setFriendsList(tempFL)
    }


    console.log(friendsList)

    return (
        <div className='maincontainer'>
            <div className='friends-list-header'>
                <div>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar
                            src={accountInfo.photo}
                            sx={{
                                width: '4em',
                                height: '4em',
                                borderColor: 'var(--text-color)',
                                borderStyle: 'solid',
                                borderWidth: '2px'
                            }}
                        />
                    </StyledBadge>
                </div>
                <div className='friends-list-header-username'>
                    {accountInfo.display_name}
                    <br />
                    {"#" + accountInfo.social_id.substr(accountInfo.social_id.length - 4)}
                </div>
                {/* <div style={{ paddingLeft: '.75em', paddingTop: '10%' }}>
                    <Badge color="primary" badgeContent={count} >
                        <IoNotificationsSharp className="friends-list-notif-icon" />
                    </Badge>
                </div> */}

            </div>
            <div className='friends-list-add'>
                <Paper
                    component="form"
                    sx={{
                        background: 'var(--dark-bg)',
                        padding: '0',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        textAlign: 'center',
                        verticalAlign: 'center'
                    }}
                >
                    <MyTextField
                        label="Add Friend"
                        id="reddit-input"
                        variant="filled"
                        fullWidth
                        sx={{ height: '3em' }}
                        value={addFriend}
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        onChange={(event) => { setAddFriend(event.target.value) }}
                    />
                    <IconButton>
                        <MdPersonAdd className='friends-list-button'
                            onClick={handleAddFriend} />
                    </IconButton>

                </Paper>
            </div>
            <div onClick={() => setFriendRequestsOpen((o) => !o)} className='display-friend-list-box'>
                Friend Requests
                {friendRequestsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {friendRequestsOpen ?
                <div className='friends-list-friends'>
                    {friendsList[1].map(function (obj, idx) {
                        console.log(obj)
                        return (
                            <FriendRequest
                                accountInfo={accountInfo}
                                setState={setState}
                                setFriendsList={setFriendsList}
                                friendsList={friendsList}
                                object={obj}
                            />
                        )
                    })}
                </div>
                : null
            }
            <div onClick={() => setFriendListOpen((o) => !o)} className='display-friend-list-box'>
                Friends
                {friendListOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
            {friendListOpen ?
                <div className='friends-list-friends'>
                    {friendsList[0].map(function (obj, idx) {
                        return (
                            <Friend
                                currentMessageIndex={currentMessageIndex}
                                setCurrentMessageIndex={setCurrentMessageIndex}
                                messages={messages}
                                setMessages={setMessages}
                                setMessagesOpen={setMessagesOpen}
                                setOpenFriendList={setOpenFriendList}
                                friendsList={friendsList}
                                setState={setState}
                                setFriendsList={setFriendsList}
                                accountInfo={accountInfo}
                                object={obj}
                                openFAccount= {openFAccount}
                                setSendInvite={setSendInvite}
                                setInviteLobby={setInviteLobby}
                                lobbyID={lobbyID}
                            />
                        )
                    })}
                </div>
                : null
            }
        </div>
    )
}

FriendsList.defaultProps = {
    username: 'Colin Harker',
    status: 'Online',
    pfp: 'https://polybit-apps.s3.amazonaws.com/stdlib/users/notedwin/profile/image.png?1630540464656'
}

Headers.propTypes = {
    username: PropTypes.string.isRequired,
    status: PropTypes.string,
    pfp: PropTypes.string.isRequired,
}

export default FriendsList

function filter() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    table = document.getElementById("friends");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}