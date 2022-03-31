import React, { useState, useRef, useEffect, useCallback } from 'react';
import useForm from '../../../../utils/useForm';
import validate from '../../../../utils/validateInfo'
import '../../../../styles/SignInModal.css'
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import GoogleLogin from 'react-google-login';
// import * as db from '../utils/dbUtils.js';
import sha256 from 'crypto-js/sha256';

import * as api from '../../../../utils/apiUtils.js'
import { AiFillPicture } from 'react-icons/ai';

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

const SignInModal = ({ accountInfo, setLoading, loggedIn, onLogin, showSignIn, setShowSignIn }) => {

    const modalRef = useRef();

    const [showSignUp, setShowSignUp] = useState(false);



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
        var hash = sha256(email)

        setLoading(true)

        var account = await api.callLogin(hash.toString(), photo, name)
         
        console.log(account)

        if (account === -1) {
            var name = name.substring(0, 14)
            var socialId = Math.floor(Math.random() * (9999 - 1000) + 1000)
            var noSpaceName = name.replace(/\s+/g, '')
            await api.callRegisterAccount(hash.toString(), photo, name, noSpaceName + "" + socialId.toString())
            var account = await api.callLogin(hash.toString(), photo, name)
        }

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
        console.log(response);
        console.log(response.profileObj.email, response.profileObj.imageUrl, response.profileObj.name)
        login(response.profileObj.email, response.profileObj.imageUrl, response.profileObj.name)
        //after login in on google login, we call login
    };


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
                            </div>
                        </div>
                    </animated.div>
                </div>
            ) : null}
        </>
    );
}

export default SignInModal
