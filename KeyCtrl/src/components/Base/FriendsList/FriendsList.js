/** @jsxImportSource theme-ui */

import React, {useState} from 'react'
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

var friends = [
    {
        username: "Peter",
        imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Gi9yAeSw0MHQt3ZOd6HhVqx_XPri0Lr5Klz08bBrQ=s96-c",
        status: true
    }, {
        username: "Frank",
        imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Gi9yAeSw0MHQt3ZOd6HhVqx_XPri0Lr5Klz08bBrQ=s96-c",
        status: true
    }, {
        username: "Charlie",
        imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Gi9yAeSw0MHQt3ZOd6HhVqx_XPri0Lr5Klz08bBrQ=s96-c",
        status: true
    }, {
        username: "Brook",
        imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Gi9yAeSw0MHQt3ZOd6HhVqx_XPri0Lr5Klz08bBrQ=s96-c",
        status: false
    }, {
        username: "Daisy",
        imageUrl: "https://lh3.googleusercontent.com/a-/AOh14Gi9yAeSw0MHQt3ZOd6HhVqx_XPri0Lr5Klz08bBrQ=s96-c",
        status: false
    }
]


 
const FriendsList = ({ accountInfo, status, username, pfp }) => {

    const [addFriend, setAddFriend] = useState([]);
  
    const handleClick = () => {
      console.log("Name:",addFriend);
      
     api.callAddFriend(accountInfo.account_id,addFriend);
    };
    
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
                            src={Image}
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
                    {username}
                </div>
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
                        onChange={(event) => {setAddFriend(event.target.value)}}
                    />
                    <IconButton>
                        <MdPersonAdd className='friends-list-button' 
                        onClick={handleClick}/>
                    </IconButton>

                </Paper>
            </div>
            <div className='friends-list-friends'>
                {friends.map(function (obj, idx) {
                    return (
                        <Friend
                            username={obj.username}
                            imageUrl={obj.imageUrl}
                            status={obj.status}
                        />
                    )
                })}
            </div>
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