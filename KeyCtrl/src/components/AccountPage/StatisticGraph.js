import { useState, React, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush } from 'recharts';
import styled from 'styled-components';
import '../../styles/StatisticGraph.css'
import '../../styles/Account.css'

const StatisticGraph = ({ dataAvg, dataTop, dataRank, gameMode }) => {

    const [dataAvg_, setDataAvg] = useState([{}]);
    const [dataTop_, setDataTop] = useState([{}]);
    const [dataRank_, setDataRank] = useState([{}]);


    useEffect(() => {

        parseData();

    }, [gameMode])

    const parseData = () => {
        var newAvg = [];
        var newTop = [];
        var newRank = [];

        console.log(dataAvg)

        dataAvg.forEach(element => {
            if (element.avg_gamemode === gameMode) {
                var dt = new Date(element.avg_timestamps)
                newAvg.push({ new_avg: element.new_avg, avg_timestamps: dt.toLocaleString() })
            }
        });

        dataTop.forEach(element => {
            if (element.top_gamemode === gameMode) {
                var dt = new Date(element.top_timestamps)
                newTop.push({ new_top: element.new_top, top_timestamps: dt.toLocaleString() })
            }
        });

        dataRank.forEach(element => {
            var dt = new Date(element.rank_timestamps)
            newRank.push({ new_rank: element.new_rank, rank_timestamps: dt.toLocaleString() })
        });

        setDataAvg(newAvg);
        setDataTop(newTop);
        setDataRank(newRank);
    }

    return (
        <div style={{ width: '90%', marginLeft: '5em' }}>
            {gameMode === 2 ?
                <div className='stat-container' style={{ flexDirection: 'column', alignSelf: 'center', justifySelf: 'center', height: '20em' }}>
                    <div style={{ fontSize: '1.5em', fontFamily: 'Almarai Light', color: 'var(--text-color)' }}>
                        Rank Over Time
                    </div>
                    <ResponsiveContainer width="80%" height="100%">
                        <LineChart
                            width={400}
                            height={300}
                            data={dataRank_}
                            title="Rank Over Time"
                            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

                            <Line type="monotone" dataKey="new_rank" stroke="var(--selection-color)" />
                            <XAxis dataKey="rank_timestamps" stroke='var(--text-color)' />
                            <YAxis stroke='var(--text-color)' />
                            <Tooltip />
                            <Brush startIndex={dataRank.length > 20 ? dataRank.length - 20 : 0} dataKey="rank_timestamps" height={25} stroke="var(--selection-color)" fill="var(--bg-color)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                : null}
            <div className='stat-container' style={{ flexDirection: 'column', justifySelf: 'flex-start', height: '20em' }}>
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
                        <Brush startIndex={dataAvg_.length > 20 ? dataAvg_.length - 20 : 0} dataKey="avg_timestamps" height={25} stroke="var(--selection-color)" fill="var(--bg-color)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='stat-container' style={{ flexDirection: 'column', justifySelf: 'flex-start', height: '20em' }}>
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
                        <Brush startIndex={dataTop_.length > 20 ? dataTop_.length - 20 : 0} dataKey="top_timestamps" height={25} stroke="var(--selection-color)" fill="var(--bg-color)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default StatisticGraph