import React, { useState, useEffect, useRef } from 'react';
import TypingTest from './components/TypingTestPage/TypingTest.js';
import SignInModal from './components/Base/TitleBar/SignInModal/SignInModal.js';
import TitleBar from './components/Base/TitleBar/TitleBar.js';
import './App.css';
import Account from './components/AccountPage/Account.js';
import OfflineAccount from './components/AccountPage/OfflineAccount.js';
import Training from './components/TrainingPage/Training.js';
import Settings from './components/SettingsPage/Settings.js';
import LoadingSpinner from './components/Base/LoadingSpinner/LoadingSpinner.js';
import * as api from './utils/apiUtils.js'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Multiplayer from './components/MultiplayerPage/Multiplayer.js';
import SlidingPane from "react-sliding-pane"
import "react-sliding-pane/dist/react-sliding-pane.css"
import FriendsList from './components/Base/FriendsList/FriendsList.js';
import Scrollbars from 'react-custom-scrollbars-2'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GameInviteToast from './components/Base/Accessories/GameInviteToast.js';
import styled from 'styled-components';
import Popup from 'reactjs-popup'
import io from "socket.io-client"
import MessageContainer from './components/Base/Accessories/MessageContainer.js';
import Unranked from './assets/unranked.png'
import Wood from './assets/wood_rank.png'
import Bronze from './assets/bronze_rank.png'
import Silver from './assets/silver_rank.png'
import Gold from './assets/gold_rank.png'
import Platinum from './assets/platinum_rank.png'
import Diamond from './assets/diamond_rank.png'
import Champion from './assets/champion_rank.png'


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
  const [WPMTime, setWPMTime] = useState(15);
  const [accountInfo, setAccountInfo] = useState({})
  const [friendsList, setFriendsList] = useState({})
  const [accountStats, setAccountStats] = useState({})
  const [currentGamemode, setCurrentGamemode] = useState(0)
  const [appStaticCountdown, setAppStaticCountdown] = useState(15);
  const [addFriend, setAddFriend] = useState([]);
  const [lobbyID, setLobbyID] = useState(0)
  const [rank, setRank] = useState('')
  const [rankImage, setRankImage] = useState()

  const [inviteLobby, setInviteLobby] = useState(0)
  const [sendInvite, setSendInvite] = useState(false)

  const [updateOnce, setUpdateOnce] = useState(false)

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const [showFriendList, setShowFriendList] = useState(false)

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const socketRef = useRef()
  const navigate = useNavigate()

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

  useEffect(() => {
    if(loggedIn){
      updateRank()
    }
  }, [accountStats])
  
  function updateRank(){
    var mmr = accountStats[6][0].mmr
    if(mmr < 500){
      setRank('Wood')
      setRankImage(Wood)
    }else if(mmr < 1000){
      setRank('Bronze')
      setRankImage(Bronze)
    }else if(mmr < 1500){
      setRank('Silver')
      setRankImage(Silver)
    }else if(mmr < 2000){
      setRank('Gold')
      setRankImage(Gold)
    }else if(mmr < 2500){
      setRank('Platinum')
      setRankImage(Platinum)
    }else if(mmr < 3000){
      setRank('Diamond')
      setRankImage(Diamond)
    }else if(mmr > 2999 ){
      setRank('Champion')
      setRankImage(Champion)
    }
  }

  function logout() {
    setAccountInfo();
    setLoggedIn(false);
  }


  async function updateApiStats(tempAccountStats) {
    await api.updateStats(currentGamemode, tempAccountStats)
  }

  const updateAccInfo = async () => {

    if (loggedIn) {
      var tempAccountStats = accountStats
      var typingStats = tempAccountStats[currentGamemode][0]

      typingStats.wpm_total_tests = typingStats.wpm_total_tests + 1
      typingStats.wpm_total_time = typingStats.wpm_total_time + appStaticCountdown
      typingStats.wpm_total_words = typingStats.wpm_total_words + (numEntries / 5)

      var wpm = parseInt(grossWPM())


      if (wpm > typingStats.wpm_top) {
        //new top wpm
        typingStats.wpm_top = wpm
        api.insertHistory(accountInfo.account_id, "top", wpm, currentGamemode)
      }

      // setting new average wpm
      var minutes = typingStats.wpm_total_time / 60
      var words = typingStats.wpm_total_words
      var new_avg_wpm = words / minutes
      typingStats.wpm_average = new_avg_wpm

      await api.insertHistory(accountInfo.account_id, "avg", new_avg_wpm.toFixed(2), currentGamemode)

      tempAccountStats[currentGamemode][0] = typingStats
      setAccountStats(tempAccountStats);

      setUpdateOnce(false);
      updateApiStats(typingStats);
    }
  }

  const grossWPM = () => {
    var words = (numEntries / 5);
    var wpm = ((words / WPMTime) * 60).toFixed(2);
    console.log(numEntries, WPMTime)
    return wpm;
  };

  const openSignIn = () => {
    setShowSignIn(prev => !prev);
  };

  const emptyForNow = () => {

  }

  useEffect(() => {
    if (loggedIn) {
      if (socketRef.current == null) {
        console.log("creating new connection")
        socketRef.current = io.connect(process.env.REACT_APP_KEYCTRL_MP)
        socketRef.current.emit('joinDefaultRoom', "GAME_" + accountInfo.account_id)
      }

      socketRef.current.on('joinFriendGame', (lobbyID, senderDisplay, senderPhoto) => {
        toast(<GameInviteToast setInviteLobby={setInviteLobby} lobbyID={lobbyID} senderName={senderDisplay} senderPhoto={senderPhoto} />, toastOptions)
      })

      socketRef.current.on('startFriendGame', (lobbyID) => {
        toast.success('Invite Sent', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
        setInviteLobby(lobbyID)
        navigate('/multiplayer')
      })

      socketRef.current.on('messageSent', function (message, sender) {
        alert(sender + ": " + message)
      })
    }
  }, [loggedIn, setInviteLobby, setSendInvite])


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
    background: var(--dark-bg);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-style: solid;
    border-color: var(--selection-color);
    color: var(--text-color);
  } 
`;

  const toastOptions = {
    position: 'top-right',
    autoClose: 30000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    hideProgressBar: false,
    transition: Bounce,
    rtl: false,
    closeButton: false
  }

  const [modalFOpen, setModalFOpen] = useState(false);
  const [friendAcc, setFriendAcc] = useState({});
  const [friendAccStat, setFriendAccStat] = useState({});
  const closeFModal = () => setModalFOpen(false);

  async function openFAccount(object) {
     const id = toast.loading("Loading profile...", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            })
    console.log(object)
    setFriendAcc(object);
    var account_stats = await api.getStats(object.account_id);
    setFriendAccStat(account_stats);
    toast.update(id, { autoClose: 1000, render: "Profile loaded", type: "success", theme: "colored", isLoading: false })
    setModalFOpen(true);
  }

  const handleAddFriend = async () => {
        console.log(accountInfo.account_id, addFriend);

        var newFriendName = addFriend.replace('#', '');
        var newFriendName = newFriendName.replace(' ', '');
        if (newFriendName === accountInfo.social_id) {
            toast.error("You can't add yourself, find more friends loser.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'colored'
            });

        } else {
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
            console.log(accountInfo.account_id, newFriendName)
            await api.callAddFriend(accountInfo.account_id, newFriendName);
            toast.update(id, { autoClose: 2000, render: "Friend request sent!", type: "success", theme: "colored", isLoading: false })
        }
        setAddFriend([])
    };

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
                    accountStats={accountStats}
                    setAccountStats={setAccountStats}
                    loggedIn={loggedIn}
                    updateAccInfo={updateAccInfo}
                    numEntries={numEntries}
                    setNumEntries={setNumEntries}
                    WPMTime={WPMTime}
                    setWPMTime={setWPMTime}
                    grossWPM={grossWPM}
                    showFriendList={showFriendList}
                    setAppStaticCountdown={setAppStaticCountdown}
                  />
                } />
                <Route exact path="/training" element={<Training />} />
                <Route exact path="/multiplayer" element={<Multiplayer rankImage={rankImage} rank={rank} setAccountStats={setAccountStats} accountStats={accountStats} openFAccount={openFAccount} loggedIn={loggedIn} accountInfo={accountInfo} inviteLobby={inviteLobby} setInviteLobby={setInviteLobby} lobbyID={lobbyID} setLobbyID={setLobbyID}/>} />
                <Route exact path="/account" element={(loggedIn ? <Account rankImage={rankImage} rank={rank} setAccountStats={setAccountStats} accountInfo={accountInfo} accountStats={accountStats} inFriend={false}/> : <OfflineAccount openSignIn={openSignIn}/>)} />
                <Route exact path="/settings" element={<Settings setAccountInfo={setAccountInfo} openSignIn={openSignIn} setShowThemeOptions={setShowThemeOptions} accountInfo={accountInfo} logout={logout} loggedIn={loggedIn} />} />
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
              <FriendsList setOpenFriendList={setState} handleAddFriend={handleAddFriend} addFriend={addFriend} setAddFriend={setAddFriend} accountInfo={accountInfo} setFriendsList={setFriendsList} friendsList={friendsList} openFAccount={openFAccount} setSendInvite={setSendInvite} setInviteLobby={setInviteLobby} lobbyID={lobbyID}/>
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
            <Account accountInfo={friendAcc} accountStats={friendAccStat} inFriend={true} />
          </Scrollbars>
        </div>
      </StyledPopup>

      {/* <MessageContainer friendsList={friendsList} accountInfo={accountInfo} loggedIn={loggedIn} /> */}
    </div>
  );
}

export default App;
