import React, { useState, useEffect } from 'react'
import { Avatar, Badge, TextField } from '@material-ui/core';
import '../../../styles/Friend.css'
import { AiOutlineCheckCircle } from "react-icons/ai"
import { MdOutlineCancel } from 'react-icons/md';
import { Tooltip } from '@material-ui/core';
import * as api from '../../../utils/apiUtils.js'

const FriendRequest = ({ accountInfo, setFriendsList, friendsList, object, setState }) => {

    const requestResponce = async(resp) => {

        console.log(friendsList[1]);

        var tempList = friendsList;

        const index = friendsList[1].indexOf(object);

        if (index > -1) {
            tempList[1].splice(index, 1); // 2nd parameter means remove one item only
        }

        console.log(tempList);

        setFriendsList(tempList)
        setState(o => !o);
        
        await api.respondToRequest(object.request_id, resp)

        if(resp === 1){
            tempList = await api.getFriends(accountInfo.account_id, accountInfo.social_id);
            setFriendsList(tempList)
            setState(o => !o);
        }
    }

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
                        <div onClick={() => requestResponce(1)} className='friend-request-button'>

                            <AiOutlineCheckCircle />
                        </div>
                    </Tooltip>
                    <Tooltip title="Decline" arrow>
                        <div onClick={() => requestResponce(0)} className='friend-request-button-cancel'>

                            <MdOutlineCancel />
                        </div>
                    </Tooltip>
                </div>

            </div>
        </div>
    )
}

export default FriendRequest