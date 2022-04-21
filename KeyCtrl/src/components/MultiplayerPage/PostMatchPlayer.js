import { Tooltip } from '@material-ui/core'
import React from 'react'
import { MdPersonAdd, MdPreview } from 'react-icons/md'
import '../../styles/MultiplayerGame.css'
import * as api from '../../utils/apiUtils.js'
import { toast } from 'react-toastify'

const PostMatchPlayer = ({inRanked, myAccId, photo, socialId, accountId, openFAccount, currentName, playerLoggedIn, loggedIn, index, playerName, wpm }) => {
   
    const handleAddFriend = async () => {

        var newFriendName = socialId.replace('#', '');
        var newFriendName = newFriendName.replace(' ', '');

        const id = toast.loading("Sending request...", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored'
        })
        console.log(myAccId, newFriendName)
        await api.callAddFriend(myAccId, newFriendName);
        toast.update(id, { autoClose: 2000, render: "Friend request sent!", type: "success", theme: "colored", isLoading: false })
    };

    var mmr;

    switch(index){
        case 1:
        mmr = "+20"
        break;
        case 2:
        mmr = "+10"
        break;
        case 3:
        mmr = "-10"
        break;
        case 4:
        mmr = "-20"
        break;
    }

    return (
        <div style={myAccId == accountId ? { borderWidth: '1px', color: 'var(--selection-color)', borderColor: 'var(--selection-color)' } : null} className='postmatch-player-base'>
            <div className='postmatch-player-placement'>{index}</div>
            <div>{playerName}</div>
            {loggedIn && playerLoggedIn && (currentName != playerName) ? <>
                <Tooltip title='View Profile'>
                    <div className='inner-icon-wrap'>
                        <MdPreview onClick={() => openFAccount({ account_id: accountId, display_name: playerName, social_id: socialId, photo: photo })} className='postmatch-icon-button' />
                    </div>
                </Tooltip>
                <Tooltip title='Send Friend Request'>
                    <div className='inner-icon-wrap'>
                        <MdPersonAdd onClick={handleAddFriend} className='postmatch-icon-button' />
                    </div>
                </Tooltip></>
                : null}
            <div className='postmatch-player-icons'>
                {inRanked ? <div style={{paddingRight: ".5em"}}>{mmr + " mmr"}</div> : null }
                <div>{wpm} wpm</div>
            </div>
        </div>
    )
}

export default PostMatchPlayer