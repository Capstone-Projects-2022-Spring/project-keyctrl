import { useState, React, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import styled from 'styled-components';
import '../../styles/StatisticGraph.css'
import '../../styles/Account.css'

const StatisticGraph = ({ dataAvg, dataTop, dataRank, gameMode }) => {

    const [dataAvg_, setDataAvg] = useState([{}]);
    const [dataTop_, setDataTop] = useState([{}]);

    useEffect(() => {

        parseData();

    }, [gameMode])

    const parseData = () => {
        var newAvg = [];
        var newTop = [];

        console.log(dataAvg)

        dataAvg.forEach(element => {
            if (element.avg_gamemode === gameMode) {
                newAvg.push({ new_avg: element.new_avg, avg_timestamps: element.avg_timestamps.substr(0, 10) + " | " + element.avg_timestamps.substr(11, 8) })
            }
        });

        dataTop.forEach(element => {
            if (element.top_gamemode === gameMode) {
                newTop.push({ new_top: element.new_top, top_timestamps: element.top_timestamps.substr(0, 10) + " | " + element.top_timestamps.substr(11, 8) })
            }
        });

        console.log(newAvg, newTop)
        setDataAvg(newAvg);
        setDataTop(newTop);
    }

    return (
        <div style={{ width: '100%' }}>
            {gameMode === 2 ?
                <div className='stat-container' style={{ flexDirection: 'column', justifySelf: 'flex-start', height: '20em', paddingRight: '5em' }}>
                    <div style={{ fontSize: '1.5em', fontFamily: 'Almarai Light', color: 'var(--text-color)' }}>
                        Rank Over Time
                    </div>
                    <ResponsiveContainer width="80%" height="100%">
                        <LineChart
                            width={400}
                            height={300}
                            data={dataRank}
                            title="Rank Over Time"
                            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

                            <Line type="monotone" dataKey="new_rank" stroke="var(--selection-color)" />
                            <XAxis dataKey="rank_timestamps" stroke='var(--text-color)' />
                            <YAxis stroke='var(--text-color)' />
                            <Tooltip />
                            <Brush dataKey="rank_timestamps" height={25} stroke="var(--selection-color)" fill="var(--bg-color)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                : null}
            <div className='stat-container' style={{ flexDirection: 'column', justifySelf: 'flex-start', height: '20em', paddingRight: '5em' }}>
                <div style={{ fontSize: '1.5em', fontFamily: 'Almarai Light', color: 'var(--text-color)' }}>
                    Average WPM Over Time
                </div>
                <ResponsiveContainer width="80%" height="100%">
                    <LineChart
                        width={400}
                        height={300}
                        data={dataAvg_}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

                        <Line type="monotone" dataKey="new_avg" stroke="var(--selection-color)" />
                        <XAxis dataKey="avg_timestamps" stroke='var(--text-color)' />
                        <YAxis stroke='var(--text-color)' />
                        <Tooltip />
                        <Brush dataKey="avg_timestamps" height={25} stroke="var(--selection-color)" fill="var(--bg-color)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='stat-container' style={{ flexDirection: 'column', justifySelf: 'flex-start', height: '20em', paddingRight: '5em' }}>
                <div style={{ fontSize: '1.5em', fontFamily: 'Almarai Light', color: 'var(--text-color)' }}>
                    Top WPM Over Time
                </div>
                <ResponsiveContainer width="80%" height="100%">
                    <LineChart
                        width={400}
                        height={300}
                        data={dataTop_}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

                        <Line type="monotone" dataKey="new_top" stroke="var(--selection-color)" />
                        <XAxis dataKey="top_timestamps" stroke='var(--text-color)' />
                        <YAxis stroke='var(--text-color)' />
                        <Tooltip />
                        <Brush dataKey="top_timestamps" height={25} stroke="var(--selection-color)" fill="var(--bg-color)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default StatisticGraph