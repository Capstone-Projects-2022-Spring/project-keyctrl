import {useRef} from 'react'
import '../../../styles/GameInviteToast.css'
import styled from 'styled-components'
import { Avatar } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ConfirmationButtonYes = styled.div`
    height: 1.5em;
    width: 8em;
    border: 1px;
    border-style: solid;
    border-color: var(--text-color);
    font-size: 1em;
    color: var(--text-color); 
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: .5em;
    margin-right: .5em;
    &:hover{
        transition: .25s;
        border-color: var(--warning);
        color: var(--warning);
        cursor: pointer;
    }
`

const ConfirmationButtonNo = styled.div`
    height: 1.5em;
    width: 8em;
    border: 1px;
    border-style: solid;
    border-color: var(--selection-color);
    font-size: 1em;
    color: var(--selection-color); 
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 1em;
    &:hover{
        transition: .25s;
        color: var(--bg-color);
         background: var(--selection-color);
        cursor: pointer;
    }
`

const GameInviteToast = ({ setInviteLobby, lobbyID, senderPhoto, senderName }) => {
    
    const toastId = useRef(null);
    const navigate = useNavigate()
    const dismiss = () =>  toast.dismiss(toastId.current);

    return (
        <div className='git-container'>
            <div className='git-details'>
                <Avatar
                    src={senderPhoto}
                    referrerPolicy="no-referrer"
                    sx={{
                        height: '8em',
                        width: '8em',
                        borderColor: 'var(--selection-color)',
                        borderStyle: 'solid',
                        borderWidth: '3px',
                    }}
                />
                <div className='git-text'>
                    {senderName} sent you an invite!
                </div>
            </div>
            <div className='git-buttons'>
                <ConfirmationButtonNo onClick={() => {
                    setInviteLobby(lobbyID)
                    navigate('/multiplayer')
                    dismiss()
                }}><>Accept</></ConfirmationButtonNo>
                <ConfirmationButtonYes onClick={dismiss}><>Decline</></ConfirmationButtonYes>
            </div>
        </div>
    )
}

export default GameInviteToast