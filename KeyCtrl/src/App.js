import React, { useState, useEffect } from 'react';
import TypingTest from './components/TypingTestPage/TypingTest.js';
import SignInModal from './components/Base/TitleBar/SignInModal/SignInModal.js';
import TitleBar from './components/Base/TitleBar/TitleBar.js';
import TaskBar from './components/Base/TaskBar/TaskBar.js';
import './App.css';
import Account from './components/AccountPage/Account.js';
import OfflineAccount from './components/AccountPage/OfflineAccount.js';
import Training from './components/TrainingPage/Training.js';
import Settings from './components/SettingsPage/Settings.js';
import LoadingSpinner from './components/Base/LoadingSpinner/LoadingSpinner.js';
import * as api from './utils/apiUtils.js'
import { Route, Routes } from 'react-router-dom';
import Multiplayer from './components/MultiplayerPage/Multiplayer.js';
import SlidingPane from "react-sliding-pane"
import "react-sliding-pane/dist/react-sliding-pane.css"
import FriendsList from './components/Base/FriendsList/FriendsList.js';
import Scrollbars from 'react-custom-scrollbars-2'
import { RemoveScrollBar } from 'react-remove-scroll-bar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components';
import Popup from 'reactjs-popup'


// Set default theme on first initialization
document.documentElement.setAttribute('data-theme', 'default');


function App() {

  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numEntries, setNumEntries] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [WPMTime, setWPMTime] = useState(1);
  const [accountInfo, setAccountInfo] = useState({})
  const [friendsList, setFriendsList] = useState({})
  const [accountStats, setAccountStats] = useState({})

  const [updateOnce, setUpdateOnce] = useState(false)

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const [showFriendList, setShowFriendList] = useState(false)

  const delay = ms => new Promise(res => setTimeout(res, ms));


  const onLogin = async (account_, accountStats_, friendsList_) => {

    setLoading(false);

    console.log(accountStats_)
    console.log(account_);

    if (account_ !== null) {
      document.documentElement.setAttribute('data-theme', account_.o_theme);
      setAccountInfo(account_);
      setAccountStats(accountStats_)
      setFriendsList(friendsList_)
      setLoggedIn(true);
      // displayMsg()
    } else {
      alert('Account does not exist');
    }

    toast.success('Welcome, ' + account_.display_name, {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored'
    });


  }

  function logout() {
    setAccountInfo();
    setLoggedIn(false);
  }

  //INCREMENTS MISSED LETTER AND UPDATES ACCINFO
  function incrementMissed(letter) {
    var jObj = JSON.parse(accountInfo.letter_misses);
    jObj[letter] = jObj[letter] + 1;
    setAccountInfo({ ...accountInfo, letter_misses: JSON.stringify(jObj) });

  }

  async function updateApiStats(avgWPM, topWpm, total_words, total_time) {

    console.log("Before Update Stats",
      avgWPM,
      topWpm,
      accountInfo)

    api.updateStats(
      avgWPM,
      topWpm,
      accountInfo.letter_misses,
      total_words,
      total_time,
      accountInfo.account_id)
  }

  const updateAccInfo = (numEntries, WPMTime, grossWPM) => {

    if (loggedIn) {

      var totWords = accountInfo.total_words + (numEntries / 5);
      var totTime = accountInfo.total_time + WPMTime;
      var avgWPM = (totWords / totTime) * 60;
      //setAccountInfo({ ...accountInfo, total_words: totWords, total_time: totTime });

      if ((grossWPM > accountInfo.top_wpm) || (accountInfo.top_wpm == null)) {
        console.log("Account Top Pre-Update wpm:", accountInfo.top_wpm);
        setAccountInfo({ ...accountInfo, top_wpm: grossWPM, total_words: totWords, total_time: totTime, avg_wpm: avgWPM });
        console.log("Account Top Post-Update wpm:", accountInfo.top_wpm);
      } else {
        grossWPM = accountInfo.top_wpm;
        setAccountInfo({ ...accountInfo, total_words: totWords, total_time: totTime, avg_wpm: avgWPM });
      }

      //setAccountInfo({ ...accountInfo, avg_wpm: avgWPM });

      console.log(avgWPM, totTime, totWords);

      updateApiStats(avgWPM, grossWPM, totWords, totTime);
    }
  }

  const grossWPM = () => {
    var words = (numEntries / 5);
    var wpm = ((words / WPMTime) * 60).toFixed(2);
    return wpm;
  };

  const openSignIn = () => {
    setShowSignIn(prev => !prev);
  };

  const emptyForNow = () => {

  }



  useEffect(() => {
    document.addEventListener('keydown', emptyForNow);

    // if (timer === 0 && !timerActive && loggedIn) {
    //   updateAccInfo(numEntries, WPMTime, grossWPM());
    // }

    if (updateOnce && loggedIn) {
      updateAccInfo(numEntries, WPMTime, grossWPM());
      setUpdateOnce(false);
    }

    return () => {
      document.removeEventListener('keydown', emptyForNow);
    };
  }, [accountInfo, index, page, numEntries, WPMTime, updateAccInfo, updateOnce])


  const StyledPopup = styled(Popup)`
    
  // use your custom style for ".popup-overlay"
  &-overlay {
    backdrop-filter: blur(10px);
  }
  // use your custom style for ".popup-content"
  &-content {
    width: 95%;
    height: 90%;
    padding: 1em;
    background: var(--bg-color);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-style: solid;
    border-color: var(--selection-color);
    color: var(--text-color);
  } 
`;

  const [modalFOpen, setModalFOpen] = useState(false);
  const [friendAcc, setFriendAcc] = useState({});
  const [friendAccStat, setFriendAccStat] = useState({});
  const closeFModal = () => setModalFOpen(false);

  async function openFAccount(object) {
    setFriendAcc(object);
    var account_stats = await api.getStats(object.account_id);
    setFriendAccStat(account_stats);
    setModalFOpen(true);
  }


  return (
    <div className="App">
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Scrollbars autoHeight autoHeightMin={window.innerHeight}>
        <div className="window">
          {/* <div className="task-bar">
          <TaskBar 
            page={page}
            setPage={setPage}
            loggedIn={loggedIn}
            setShowFriendList={setShowFriendList}
            showFriendList={showFriendList} />
        </div> */}
          <div className="landing">
            {/* <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            /> */}


            <TitleBar
              page={page}
              setPage={setPage}
              loggedIn={loggedIn}
              setShowFriendList={setShowFriendList}
              showFriendList={showFriendList}
              openSignIn={openSignIn}
              logout={logout}
              setState={setState}
              friendsList={friendsList} />

            <div className="main-window">
              {loading ? <LoadingSpinner /> : null}

              <Routes>
                <Route exact path="/" element={
                  <TypingTest
                    setUpdateOnce={setUpdateOnce}
                    setIndex={setIndex}
                    index={index}
                    accountInfo={accountInfo}
                    setAccountInfo={setAccountInfo}
                    loggedIn={loggedIn}
                    incrementMissed={incrementMissed}
                    updateAccInfo={updateAccInfo}
                    numEntries={numEntries}
                    setNumEntries={setNumEntries}
                    WPMTime={WPMTime}
                    setWPMTime={setWPMTime}
                    grossWPM={grossWPM}
                  />
                } />
                <Route exact path="/training" element={<Training />} />
                <Route exact path="/multiplayer" element={<Multiplayer />} />
                <Route exact path="/account" element={(loggedIn ? <Account accountInfo={accountInfo} accountStats={accountStats} /> : <OfflineAccount />)} />
                <Route exact path="/settings" element={<Settings setShowThemeOptions={setShowThemeOptions} accountInfo={accountInfo} logout={logout} loggedIn={loggedIn} />} />
              </Routes>

            </div>

            <SlidingPane
              className='friends-list-popup'
              closeIcon={<div>Some div containing custom close icon.</div>}
              hideHeader={true}
              isOpen={state.isPaneOpen}
              from="right"
              width="300px"
              onRequestClose={() => setState({ isPaneOpen: false })}
            >
              <FriendsList accountInfo={accountInfo} setFriendsList={setFriendsList} friendsList={friendsList} openFAccount={openFAccount} />
            </SlidingPane>

          </div>

          <SignInModal setLoading={setLoading} loggedIn={loggedIn} onLogin={onLogin} showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
        </div>
      </Scrollbars>

      <StyledPopup
        open={modalFOpen}
        position="center"
        modal
        closeOnDocumentClick
        onClose={closeFModal}
      >
        <div className="view-account-modal">
          <button className="exit-view-account-button" onClick={() => closeFModal()}>X</button>
          <Scrollbars style={{ height: '90vh' }}>
            <Account accountInfo={friendAcc} accountStats={friendAccStat} />
          </Scrollbars>
        </div>
      </StyledPopup>

    </div>
  );
}

export default App;
