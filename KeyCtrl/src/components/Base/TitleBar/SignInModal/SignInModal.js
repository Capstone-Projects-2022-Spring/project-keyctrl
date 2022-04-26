import React, { useState, useRef, useEffect, useCallback } from 'react';
import useForm from '../../../../utils/useForm';
import validate from '../../../../utils/validateInfo'
import '../../../../styles/SignInModal.css'
import { useSpring, animated } from 'react-spring';
import { MdClose, MdOutlineFacebook } from 'react-icons/md';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login'
// import * as db from '../utils/dbUtils.js';
import sha256 from 'crypto-js/sha256';

import * as api from '../../../../utils/apiUtils.js'
import { AiFillPicture } from 'react-icons/ai';
import styled from 'styled-components';
import Popup from 'reactjs-popup'

/**
 * @module SignInModal
 * @param {Function} onLogin
 * @param {Boolean} showSignIn
 * @param {Function} setShowSignIn
 * @description Popup modal that displays sign in instructions
 * @returns Component to be displayed
 * @example
 * <SignInModal onLogin={onLogin} showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
 */

const StyledPopup = styled(Popup)`
    
  // use your custom style for ".popup-overlay"
  &-overlay {
    backdrop-filter: blur(10px);
  }
  // use your custom style for ".popup-content"
  &-content {
    padding: 2em;
    background: var(--bg-color);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-style: solid;
    border-color: var(--selection-color);
    color: var(--text-color);
    width: 20em;
  } 
`;

const ConfirmationButtonYes = styled.div`
    margin-bottom: .5em;
    padding: .5em;
    border: 1px;
    border-style: solid;
    border-color: var(--text-color);
    font-size: 1em;
    /* background: var(--primary-color); */
    color: var(--text-color); 
    &:hover{
        transition: .25s;
        border-color: var(--selection-color);
        color: var(--selection-color);
        cursor: pointer;
    }
`

const SignInModal = ({ accountInfo, setLoading, loggedIn, onLogin, showSignIn, setShowSignIn }) => {

    const modalRef = useRef();

    const [showSignUp, setShowSignUp] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [respEmail, setRespEmail] = useState()
    const [respName, setRespName] = useState()

    const [email_, setEmail] = useState()
    const [photo_, setPhoto] = useState()
    const [name_, setName] = useState()



    /**
     * @function login
     * @description Api call to log in and passes result to onLogin()
     */
    // const login = (email) => {
    //     onLogin(api.callLogin(email));
    // }

    // /**
    //  * @function register
    //  * @description Api call to register new account and passes result to onLogin()
    //  */
    // const register = () => {
    //     onLogin(
    //         api.callRegisterAccount(values.email, values.username, values.password),
    //         api.getStats());
    // }


    /**
      @function HashedEmail
      @description Api call to log in but the email is HASHED and passes result to onLogin(). THIS IS A WORKING METHOD TO BE USED IN THE FUTURE
     */

    const login = async (email, photo, name) => {
        setEmail(email)
        setPhoto(photo)
        setName(name)

        var hash = sha256(email)

        setLoading(true)

        var account = await api.callLogin(hash.toString(), photo, name)

        console.log(account)

        if (account === -1) {
            console.log("why no work")
            setModalOpen(true)
            setLoading(false)
        } else {
            var account_stats = await api.getStats(account.account_id);
            var friends_list = await api.getFriends(account.account_id, account.social_id);


            console.log(account)

            onLogin(
                account,
                account_stats,
                friends_list
            );
        }
    }

    const createAccount = async () => {
        setModalOpen(false)
        setLoading(true)
        var hash = sha256(email_)
        setName(name_.substring(0, 15))
        var socialId = Math.floor(Math.random() * (9999 - 1000) + 1000)
        var noSpaceName = name_.replace(/\s+/g, '')
        await api.callRegisterAccount(hash.toString(), photo_, name_, noSpaceName + "" + socialId.toString())
        var account = await api.callLogin(hash.toString(), photo_, name_)
        var account_stats = await api.getStats(account.account_id);
        var friends_list = await api.getFriends(account.account_id, account.social_id);

        console.log(account)
        onLogin(
            account,
            account_stats,
            friends_list
        );
    }

    /**
     * @function submitForm
     * @description Method that is activated on signin/register button press, login or registers account
     */
    function submitForm() {
        if (!showSignUp) {
            console.log("Login Pressed");
            login();
        } else if (showSignUp) {
            console.log("SignUp Pressed");
            // register();
        }

        setShowSignIn(false);
        values.email = '';
        values.username = '';
        values.password = '';
        values.password2 = '';
    }

    const { handleChange, handleSubmit, values, errors } = useForm(
        submitForm,
        validate
    );


    /**
     * @function openSignUp
     * @description Flips boolean value to show signup insead of register
     */
    const openSignUp = () => {
        setShowSignUp(prev => !prev);
    };

    /**
     * @function closeModal
     * @param {Event} e 
     * @description Closes current modalRef
     */
    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowSignIn(false);
        }
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showSignIn) {
                setShowSignIn(false);
                console.log('I pressed');
            }
        },
        [setShowSignIn, showSignIn]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            // db.initCon();

            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    const responseGoogle = response => {
        setShowSignIn(false)
        setRespEmail(response.profileObj.email)
        setRespName(response.profileObj.name)
        login(response.profileObj.email, response.profileObj.imageUrl, response.profileObj.name)
        //after login in on google login, we call login
    };

    const responseFacebook = (response) => {
        setShowSignIn(false)
        setRespEmail(response.email)
        setRespName(response.name)
        login(response.email, response.picture.url, response.name)
    }

    const componentClicked = () => {
        console.log("Clicked")
    }

    return (
        <>
            {showSignIn ? (
                <div className='Background' onClick={closeModal} ref={modalRef}>

                    <animated.div >
                        <div className='ModalWrapper' showSignIn={showSignIn}>
                            <MdClose
                                aria-label='Close modal'
                                className='close-modal'
                                onClick={() => setShowSignIn(prev => !prev)}
                            />
                            <div className='ModalContent'>

                                <GoogleLogin
                                    clientId="568691465172-6a0kbo3t147jc4oi2bfomq8fjcq6cj2k.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy="single_host_origin" />
                                <FacebookLogin
                                    appId="1021992962032784"
                                    fields="name,email,picture"
                                    onClick={() => componentClicked()}
                                    callback={responseFacebook}
                                    cssClass="my-facebook-button-class"
                                />

                            </div>
                        </div>
                    </animated.div>
                </div>
            ) : null}
            <StyledPopup
                open={modalOpen}
                position="center"
                modal
                closeOnDocumentClick
            >
                {!showTerms ?
                    <div>
                        <MdClose onClick={() => setModalOpen(false)}></MdClose>
                        <div style={{ fontFamily: 'Almarai', fontWeight: "bold" }}>
                            Create your account
                        </div>
                        <div style={{ fontFamily: 'Almarai' }} className="delete-account-popup">
                            <div style={{ textAlign: 'start' }}>Email Address</div>
                            <div style={{ textAlign: 'start', fontWeight: 'bold' }}>{respEmail}</div>
                            <br />
                            <div style={{ textAlign: 'start' }}>Full name</div>
                            <div style={{ textAlign: 'start', fontWeight: 'bold' }}>{respName}</div>
                            <br />
                            <div style={{ fontFamily: 'Almarai Light', fontSize: '.85em', textAlign: 'start' }}>
                                By creating an account, I accept that KeyCtrl will only save my account photo and name (name can be changed by user).
                            </div>
                            <br />
                            <ConfirmationButtonYes onClick={createAccount}>Create account</ConfirmationButtonYes>
                        </div>
                    </div> : 
                    null
                    }
            </StyledPopup>
        </>
    );
}

const rawHtml = `

`

export default SignInModal
