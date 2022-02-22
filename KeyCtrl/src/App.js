import React, { useState, useEffect, useReducer } from 'react';
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
import { MdSecurityUpdate } from 'react-icons/md';
import { Route, Routes } from 'react-router-dom';
import Multiplayer from './components/MultiplayerPage/Multiplayer.js';

function App() {

  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [showSignIn, setShowSignIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numEntries, setNumEntries] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [WPMTime, setWPMTime] = useState(1);
  const [accountInfo, setAccountInfo] = useState({})
  const [updateOnce, setUpdateOnce] = useState(false)

  const delay = ms => new Promise(res => setTimeout(res, ms));
  const onLogin = async (account) => {

    setLoading(true);

    await (delay(4000));

    setLoading(false);

    console.log(account);
    if (account.account_id != -1) {
      setAccountInfo(account);
      setLoggedIn(true);
    } else {
      alert('Account does not exist');
    }

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
  }, [accountInfo, index, page])

  return (
    <div className="App">
      <div className="window">
        <div className="task-bar">
          <TaskBar page={page} setPage={setPage} />
        </div>
        <div className="landing">
          <TitleBar loggedIn={loggedIn} openSignIn={openSignIn} />
          <div className="main-window">
            {loading ? <LoadingSpinner /> : null}

            <Routes>
              <Route exact path="/typing-test" element={
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
              <Route exact path="/account" element={(loggedIn ? <Account accountInfo={accountInfo} /> : <OfflineAccount />)} />
              <Route exact path="/settings" element={<Settings accountInfo={accountInfo} logout={logout} loggedIn={loggedIn} />} />
            </Routes>

          </div>
        </div>
        <SignInModal onLogin={onLogin} showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      </div>

    </div>
  );
}

export default App;
