import React, { useState, useRef, useEffect, useCallback } from 'react';
import useForm from '../../../utils/useForm';
import validate from '../../../utils/validateInfo'
import "./SignInModal.css"
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
// import * as db from '../utils/dbUtils.js';

import * as api from '../../../utils/apiUtils.js'

const SignInModal = ({ onLogin, showSignIn, setShowSignIn }) => {

    const modalRef = useRef();

    const [showSignUp, setShowSignUp] = useState(false);

    const login = () => {
        onLogin(api.callLogin(values.username, values.password));        
    }

    const register = () => {
        onLogin(api.callRegisterAccount(values.email, values.username, values.password));
    }

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


    const openSignUp = () => {
        setShowSignUp(prev => !prev);
    };

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

    const onFormSubmit = (e) => {
        if (showSignUp) {
            handleSubmit(e);
        } else if (showSignIn) {
            submitForm();
        }
    }

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            // db.initCon();

            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );
    return (
        <>
            {showSignIn ? (
                <div className='Background' onClick={closeModal} ref={modalRef}>
                    <animated.div >
                        <form onSubmit={onFormSubmit} noValidate>
                            <div className='ModalWrapper' showSignIn={showSignIn}>
                                <MdClose
                                    aria-label='Close modal'
                                    className='close-modal'
                                    onClick={() => setShowSignIn(prev => !prev)}
                                />
                                <div className='ModalContent'>
                                    {showSignUp ? <h1>Sign Up</h1> : <h1>Login</h1>}

                                    {showSignUp ? <div className='form-inputs'>
                                        <input
                                            className='form-input'
                                            type='email'
                                            name='email'
                                            placeholder='Email'
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <p className="errors">{errors.email}</p>}
                                    </div>
                                        : null}
                                    <div className='form-inputs'>
                                        <input
                                            className='form-input'
                                            type='text'
                                            name='username'
                                            placeholder='Username'
                                            value={values.username}
                                            onChange={handleChange}
                                        />
                                        {errors.username && <p className="errors">{errors.username}</p>}
                                    </div>
                                    <div className='form-inputs'>
                                        <input
                                            className='form-input'
                                            type='password'
                                            name='password'
                                            placeholder='Password'
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && <p className="errors">{errors.password}</p>}
                                    </div>
                                    {showSignUp ? <div className='form-inputs'>
                                        <input
                                            className='form-input'
                                            type='password'
                                            name='password2'
                                            placeholder='Confirm Password'
                                            value={values.password2}
                                            onChange={handleChange}
                                        />
                                        {errors.password2 && <p className="errors">{errors.password2}</p>}
                                    </div>
                                        : null}
                                    <div className='sign-in-options'>
                                        <div className='account-links'>
                                            {showSignUp ? null : <div className='individual'>Forgot password?</div>}
                                            <div onClick={openSignUp} className='individual'>{showSignUp ? 'Already have account? Login' : 'Register account'}</div>
                                        </div>
                                    </div>
                                    <button type="submit" className="sign-in-button">{showSignUp ? 'Sign up' : 'Login'}</button>
                                </div>

                            </div>
                        </form>
                    </animated.div>
                </div>
            ) : null}
        </>
    );
}

export default SignInModal
