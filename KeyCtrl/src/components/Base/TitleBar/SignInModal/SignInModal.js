import React, { useState, useRef, useEffect, useCallback } from 'react';
import useForm from '../../../../utils/useForm';
import validate from '../../../../utils/validateInfo'
import '../../../../styles/SignInModal.css'
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import GoogleLogin from 'react-google-login';
// import * as db from '../utils/dbUtils.js';

import * as api from '../../../../utils/apiUtils.js'

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

const SignInModal = ({ onLogin, showSignIn, setShowSignIn }) => {

    const modalRef = useRef();

    const [showSignUp, setShowSignUp] = useState(false);


    /**
     * @function login
     * @description Api call to log in and passes result to onLogin()
     */
    const login = () => {
        onLogin(api.callLogin(values.username, values.password));
    }

    /**
     * @function register
     * @description Api call to register new account and passes result to onLogin()
     */
    const register = () => {
        onLogin(api.callRegisterAccount(values.email, values.username, values.password));
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
            register();
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
        console.log(response);
        console.log(response.profileObj.email)
        values.email = response.profileObj.email
        values.password = "1111"
        values.username = response.profileObj.name
        register()
        // Need better code for login or register, 
        // will try to handle this server side instead so we can limit it
        // to one function call
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
