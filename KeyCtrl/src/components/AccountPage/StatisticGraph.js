import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import '../../styles/StatisticGraph.css'

const StatisticGraph = () => {
    const data = [
        { name: 'January', wpm: 55.6, rank: 450 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'January', wpm: 55.6, rank: 450 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'January', wpm: 55.6, rank: 450 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'January', wpm: 55.6, rank: 450 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'January', wpm: 55.6, rank: 450 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'January', wpm: 55.6, rank: 450 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'January', wpm: 55.6, rank: 450 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'January', wpm: 55.6, rank: 450 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 },
        { name: 'January', wpm: 55.6, rank: 450 },
        { name: 'February', wpm: 58.6, rank: 2400 },
        { name: 'March', wpm: 61.4, rank: 2400 },
        { name: 'April', wpm: 65.4, rank: 2400 },
        { name: 'May', wpm: 65.4, rank: 2400 }
    ];

    return (
         <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

                <Line type="monotone" dataKey="wpm" stroke="var(--selection-color)" />
                <XAxis dataKey="name" stroke='var(--text-color)' />
                <YAxis stroke='var(--text-color)' />
                <Tooltip />
            </LineChart>
         </ResponsiveContainer> 
    )
}

export default StatisticGraph