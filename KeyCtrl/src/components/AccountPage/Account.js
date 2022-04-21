/** @jsxImportSource theme-ui */

import { React, useState, useEffect } from 'react'
import '../../styles/Account.css'
import SingleStatDisplay from './SingleStatDisplay.js'
import StatisticGraph from './StatisticGraph'
import StatKeyboard from './StatKeyboard.js'
import Image from "../../assets/colin-profile.png"
import Unranked from '../../assets/unranked.png'
import Wood from '../../assets/wood_rank.png'
import History from './History'
import { Avatar, Tab, Tabs, Box, Typography } from '@material-ui/core'
import ColoredLine from '../SettingsPage/ColoredLine'
import * as api from '../../utils/apiUtils.js'
import Leaderboard from './Leaderboard'

/**
 * @module Account
 * @param {Object} accountInfo
 * @description Account page that is displayed when logged in, shows statistics and graphics related to typing activity
 * @returns Component to be displayed
 * @example
 * <Account accountInfo={accountInfo} />
 */


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Account = ({ rankImage, rank, accountInfo, accountStats, setAccountStats, inFriend }) => {

    const [statPage, setStatPage] = useState(0);
    const [value, setValue] = useState(0);
    const [currentStats, setCurrentStats] = useState(0)
    const [keyboardDisplay, setKeyboardDisplay] = useState(0)

    useEffect(async () => {
        if (!inFriend) {
            console.log(accountInfo.account_id)
            var newStats = await api.getStats(accountInfo.account_id)
            setAccountStats(newStats)
        }
    }, [])


    const handleChange = (event, newValue) => {
        setCurrentStats(newValue);
    };

    const triggerInSummary = (page) => {
        setStatPage(page)
    }

    const getTime = () => {
        return new Date(getCurrentGameMode().wpm_total_time * 1000).toISOString().substr(11, 8);
    }

    const getCurrentGameMode = () => {
        if (currentStats === 0) {
            return trainingStats
        } else if (currentStats === 1) {
            return speedStats
        } else if (currentStats === 2) {
            return rankedStats
        }
    }

    console.log(accountStats)

    var trainingStats = accountStats[0][0]
    var speedStats = accountStats[1][0]
    var rankedStats = accountStats[2][0]

    const getPage = (page) => {
        if (page == 0) {
            return (<div className='acc-base'>
                <div className="stat-container">
                    <div className="acc-id">
                        <div className='profile'>

                            <Avatar
                                src={accountInfo.photo}
                                referrerPolicy="no-referrer"
                                sx={{
                                    height: '7em',
                                    width: '7em',
                                    borderColor: 'var(--selection-color)',
                                    borderStyle: 'solid',
                                    borderWidth: '3px'
                                }}
                            />


                        </div>
                        <div className='profile-user'>
                            {accountInfo.display_name}
                            <br />
                            {"#" + accountInfo.social_id.substr(accountInfo.social_id.length - 4)}
                        </div>

                        <div className='acc-stat'>
                            <div className='stat'>
                                <div className='title'>Current MMR</div>
                                <div className='data'>{accountStats[6][0].mmr}</div>
                            </div>
                            {/* <div className='stat'>
                                <div className='title'>Global Position</div>
                                <div className='data'>1</div>
                            </div> */}
                        </div>

                        <div className='acc-stat'>
                            <div className='stat'>
                                <div className='title'>Playtime</div>
                                <div className='data'>{getTime()}</div>
                            </div>
                            <div className='stat'>
                                <div className='title'>Joined</div>
                                <div className='data'>{accountStats[6][0].creation_date.substr(0, 10)}</div>
                            </div>
                        </div>

                        <div className='acc-ranked'>
                            <div>Rank</div>
                            <img src={rankImage} />
                            <div style={{ color: 'var(--selection-color)' }}>{rank}</div>
                        </div>

                    </div>

                </div>

                <ColoredLine
                    color="var(--primary-color)"
                    width='80%'
                />

                <div style={{ color: 'var(--text-color)', marginBottom: '.4em', marginTop: '2em' }}>
                    Game Mode
                </div>
                <div className='gamemode-tab-container'>
                    <div style={currentStats === 0 ? { color: 'var(--selection-color' } : null} onClick={() => setCurrentStats(0)} className='gamemode-tab'>Training</div>
                    {/* <div style={currentStats === 1 ? { color: 'var(--selection-color' } : null} onClick={() => setCurrentStats(1)} className='gamemode-tab'>Speed</div> */}
                    <div style={currentStats === 2 ? { color: 'var(--selection-color' } : null} onClick={() => setCurrentStats(2)} className='gamemode-tab'>Ranked</div>
                </div>

                <div className='stats-wing-base'>
                    <SingleStatDisplay title="Top WPM" data={getCurrentGameMode().wpm_top == null ? 0 : Number(getCurrentGameMode().wpm_top).toFixed(2)} />
                    <SingleStatDisplay title="Avg WPM" data={getCurrentGameMode().wpm_average == null ? 0 : getCurrentGameMode().wpm_average.toFixed(2)} />
                    <SingleStatDisplay title="Games Played" data={getCurrentGameMode().wpm_total_tests} />
                    <SingleStatDisplay title="Mode Playtime" data={getTime()} />
                </div>

                <div className='stat-container'>
                    <div className='stat-keyboard-display'>
                        <div onClick={() => setKeyboardDisplay(0)} style={keyboardDisplay == 0 ? { color: 'var(--selection-color)' } : null} className='stat-keyboard-display-button'>
                            Number Missed
                        </div>
                        <div onClick={() => setKeyboardDisplay(1)} style={keyboardDisplay == 1 ? { color: 'var(--selection-color)' } : null} className='stat-keyboard-display-button'>
                            Percent Missed
                        </div>
                    </div>

                    <StatKeyboard keyboardDisplay={keyboardDisplay} letter_misses={getCurrentGameMode()} />

                </div>

                <ColoredLine
                    color="var(--primary-color)"
                    width='80%'
                />

                <StatisticGraph dataAvg={accountStats[3]} dataTop={accountStats[4]} dataRank={accountStats[5]} gameMode={currentStats} />
            </div>)
        } else if (page == 1) {
            return <History accountInfo={accountInfo} accountStats={accountStats} />
        } else {
            return <Leaderboard accountStats={accountStats} />
        }

    }

    return (
        <div>
            <div className='stat-tab'>
                <div onClick={() => triggerInSummary(0)} className='stat-tab-selection' style={statPage == 0 ? { color: 'var(--selection-color)' } : null}>Summary</div>
                <div onClick={() => triggerInSummary(1)} className='stat-tab-selection' style={statPage == 1 ? { color: 'var(--selection-color)' } : null}>History</div>
                <div onClick={() => triggerInSummary(2)} className='stat-tab-selection' style={statPage == 2 ? { color: 'var(--selection-color)' } : null}>Leaderboard</div>
            </div>
            {getPage(statPage)}
        </div>
    )
}

export default Account
