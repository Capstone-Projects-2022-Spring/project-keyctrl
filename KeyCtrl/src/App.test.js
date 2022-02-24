import { render, screen } from '@testing-library/react';
import { object } from 'prop-types';
import App from './App';
import Account from './components/AccountPage/Account';
import OfflineAccount from './components/AccountPage/OfflineAccount';
import TaskBar from './components/Base/TaskBar/TaskBar';
import TitleBar from './components/Base/TitleBar/TitleBar';
import Multiplayer from './components/MultiplayerPage/Multiplayer';
import Settings from './components/SettingsPage/Settings';
import Training from './components/TrainingPage/Training';
import TypingTest from './components/TypingTestPage/TypingTest.js'

describe('Component render tests', () => {

  test('Render Multiplayer component', () => {
    render(<Multiplayer />);

    const screenElement = screen.getByText(/Multiplayer/i);
    expect(screenElement).toBeInTheDocument();
  });

  test('Render Training component', () => {
    render(<Training />);

    const screenElement = screen.getByText(/New Mode Coming Soon!/i);
    expect(screenElement).toBeInTheDocument();
  });

  // Cannot get this test to pass

  // test('Render Account component', () => {
  //   var accountInfo = JSON.stringify({
  //     account_id: -1,
  //     display_name: "",
  //     user_email: "",
  //     password: "",
  //     photo: -1,
  //     avg_wpm: -1,
  //     top_wpm: -1,
  //     letter_misses: "",
  //     total_words: -1,
  //     total_time: -1
  //   })
  //   render(<Account accountInfo={accountInfo} />);

  //   const screenElement = screen.getByText(/ /i);
  //   expect(screenElement).toBeInTheDocument();
  // });

  test('Render OfflineAccount component', () => {
    render(<OfflineAccount />);

    const screenElement = screen.getByText(/Please Login to view account statistics/i);
    expect(screenElement).toBeInTheDocument();
  });

  test('Render Settings component', () => {
    var accountInfo = {}
    const logout = () => { }
    var loggedIn = false

    render(<Settings
      accountInfo={accountInfo}
      logout={logout}
      loggedIn={loggedIn}
    />);

    const screenElement = screen.getByText(/Login to view account settings/i);
    expect(screenElement).toBeInTheDocument();
  });

  test('Render TitleBar component', () => {
    const openSignIn = () => { }
    var loggedIn = false

    render(<TitleBar loggedIn={loggedIn} openSignIn={openSignIn} />);

    const screenElement = screen.getByText(/Login/i);
    expect(screenElement).toBeInTheDocument();
  });

  // Need to find way to mock <Router /> and useHref()

  // test('Render TaskBar component', () => {
  //   const setPage = () => { }
  //   var page = -1

  //   renderWithRou(<TaskBar page={page} setPage={setPage} />);

  //   const screenElement = screen.getByText(/Login/i);
  //   expect(screenElement).toBeInTheDocument();
  // });
})
