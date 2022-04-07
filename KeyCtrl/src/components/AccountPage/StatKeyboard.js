import React, { useEffect, useState } from 'react'
import '../../styles/StatKeyboard.css'
import '../../styles/Account.css'
import { ReactComponent as KeyBoard } from "../../assets/keyboard_shell.svg"
import { Tooltip, withStyles } from '@material-ui/core';
import SingleStatDisplay from './SingleStatDisplay.js'
import ToolTipStatKeyboard from './ToolTipStatKeyboard';


// ------------------ PROCEDE WITH CAUTION -----------------------------------
//-----------------THIS CODE IS AN ABOMINATION -------------------------------


const LightTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: 'var(--primary-color)',
        color: 'var(--text-color)',
        width: 'auto',
        fontSize: 11,
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'var(--selection-color)'
    }
}))(Tooltip);

/**
 * @module StatKeyboard
 * @param {JSON} letter_misses 
 * @description Keyboard graphic that is displayed showing colored representation of letter misses
 * @returns Component to be displayed
 * @example
 * <StatKeyboard letter_misses={accountInfo.letter_misses} />
 */

const StatKeyboard = ({ keyboardDisplay, letter_misses }) => {

    const [mostLeast, setMostLeast] = useState({ 0: 'A', 1: 'Z' })

    var total = null;
    var max = null;
    const mode_map = fuckYouJason(letter_misses);
    var sortedMap;

    /**
     * @function calcTotal
     * @description Finds max missed letter and sorts letter map in decending order
     */
    const calcTotal = (map) => {
        console.log(map)
        total = 0;
        max = Number.MIN_SAFE_INTEGER;
        Object.keys(map).map(el => {
            total += parseFloat(map[el]);
            max = (max < parseFloat(map[el])) ? parseFloat(map[el]) : max;
        });
        return map
    }

    /**
     * @function getColor
     * @param {Number} key 
     * @description Returns color to be displayed for current letter
     * @returns String HEX color value
     */
    const getColor = (key) => {

        const ratio = parseFloat(sortedMap[key]) / parseFloat(max);

        if (ratio === 1) {
            return '#f25c54';
        } else if (ratio >= .50) {
            return '#FFA34E';
        } else if (ratio >= .25) {
            return '#f4845f';
        } else if (ratio >= .10) {
            return '#2dc653';
        } else if (ratio > 0) {
            return '#6ede8a';
        } else {
            return '#92e6a7';
        }

    }




    sortedMap = calcTotal(keyboardDisplay == 0 ? mode_map.misses : mode_map.miss_percent);

    var jObj = sortedMap
    var sortedMisses = Object.entries(jObj).sort((a, b) => b[1] - a[1]);
    console.log(sortedMisses)

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
            }}>
                <SingleStatDisplay title={keyboardDisplay == 0 ? "Most Missed" : "Highest Percent Miss"} data={sortedMisses[0][0].toUpperCase()} />
            </div>
            <div className='stat-keyboard-base'>
                <div style={{ backgroundColor: getColor("q") }} className="key" id="q" />
                <div style={{ backgroundColor: getColor("w") }} className="key" id="w" />
                <div style={{ backgroundColor: getColor("e") }} className="key" id="e" />
                <div style={{ backgroundColor: getColor("r") }} className="key" id="r" />
                <div style={{ backgroundColor: getColor("t") }} className="key" id="t" />
                <div style={{ backgroundColor: getColor("y") }} className="key" id="y" />
                <div style={{ backgroundColor: getColor("u") }} className="key" id="u" />
                <div style={{ backgroundColor: getColor("i") }} className="key" id="i" />
                <div style={{ backgroundColor: getColor("o") }} className="key" id="o" />
                <div style={{ backgroundColor: getColor("p") }} className="key" id="p" />
                <div style={{ backgroundColor: getColor("a") }} className="key" id="a" />
                <div style={{ backgroundColor: getColor("s") }} className="key" id="s" />
                <div style={{ backgroundColor: getColor("d") }} className="key" id="d" />
                <div style={{ backgroundColor: getColor("f") }} className="key" id="f" />
                <div style={{ backgroundColor: getColor("g") }} className="key" id="g" />
                <div style={{ backgroundColor: getColor("h") }} className="key" id="h" />
                <div style={{ backgroundColor: getColor("j") }} className="key" id="j" />
                <div style={{ backgroundColor: getColor("k") }} className="key" id="k" />
                <div style={{ backgroundColor: getColor("l") }} className="key" id="l" />
                <div style={{ backgroundColor: getColor("z") }} className="key" id="z" />
                <div style={{ backgroundColor: getColor("x") }} className="key" id="x" />
                <div style={{ backgroundColor: getColor("c") }} className="key" id="c" />
                <div style={{ backgroundColor: getColor("v") }} className="key" id="v" />
                <div style={{ backgroundColor: getColor("b") }} className="key" id="b" />
                <div style={{ backgroundColor: getColor("n") }} className="key" id="n" />
                <div style={{ backgroundColor: getColor("m") }} className="key" id="m" />
                {/* <img className="keyboard-img" src={KeyBoard} /> */}
                <KeyBoard className="keyboard-img" fill="var(--primary-color)" />
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="q" param1={sortedMap["q"]} />
                }>
                    <div className="key1" id="q" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="w" param1={sortedMap["w"]} />
                }>
                    <div className="key1" id="w" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="e" param1={sortedMap["e"]} />
                }>
                    <div className="key1" id="e" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="r" param1={sortedMap["r"]} />
                }>
                    <div className="key1" id="r" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="t" param1={sortedMap["t"]} />
                }>
                    <div className="key1" id="t" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="y" param1={sortedMap["y"]} />
                }>
                    <div className="key1" id="y" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="u" param1={sortedMap["u"]} />
                }>
                    <div className="key1" id="u" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="i" param1={sortedMap["i"]} />
                }>
                    <div className="key1" id="i" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="o" param1={sortedMap["o"]} />
                }>
                    <div className="key1" id="o" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="p" param1={sortedMap["p"]} />
                }>
                    <div className="key1" id="p" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="a" param1={sortedMap["a"]} />
                }>
                    <div className="key1" id="a" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="s" param1={sortedMap["s"]} />
                }>
                    <div className="key1" id="s" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="d" param1={sortedMap["d"]} />
                }>
                    <div className="key1" id="d" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="f" param1={sortedMap["f"]} />
                }>
                    <div className="key1" id="f" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="g" param1={sortedMap["g"]} />
                }>
                    <div className="key1" id="g" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="h" param1={sortedMap["h"]} />
                }>
                    <div className="key1" id="h" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="j" param1={sortedMap["j"]} />
                }>
                    <div className="key1" id="j" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="k" param1={sortedMap["k"]} />
                }>
                    <div className="key1" id="k" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="l" param1={sortedMap["l"]} />
                }>
                    <div className="key1" id="l" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="z" param1={sortedMap["z"]} />
                }>
                    <div className="key1" id="z" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="x" param1={sortedMap["x"]} />
                }>
                    <div className="key1" id="x" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="c" param1={sortedMap["c"]} />
                }>
                    <div className="key1" id="c" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="v" param1={sortedMap["v"]} />
                }>
                    <div className="key1" id="v" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="b" param1={sortedMap["b"]} />
                }>
                    <div className="key1" id="b" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="n" param1={sortedMap["n"]} />
                }>
                    <div className="key1" id="n" />
                </LightTooltip>
                <LightTooltip title={
                    <ToolTipStatKeyboard keyboardDisplay={keyboardDisplay} letter="m" param1={sortedMap["m"]} />
                }>
                    <div className="key1" id="m" />
                </LightTooltip>
            
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
            }}>
                <SingleStatDisplay title={keyboardDisplay == 0 ? "Least Missed" : "Lowest Percent Miss"} data={sortedMisses[25][0].toUpperCase()} />
            </div>
        </div>
    )
}

export default StatKeyboard

function fuckYouJason(map) {
    // I hate everything about this

    var newMap = {
        misses: {},
        times: {},
        occurrences: {},
        miss_percent: {}
    };

    console.log(map)

    for (var key in map) {
        if (key.toString().includes("misses")) {
            newMap.misses[key[0]] = map[key]
        } else if (key.toString().includes("occurrences")) {
            newMap.occurrences[key[0]] = map[key]
        } else if (key.toString().includes("times")) {
            newMap.times[key[0]] = map[key]
        }
    }

    for (var key in newMap.misses) {
        newMap.miss_percent[key] = (((newMap.misses[key] / newMap.occurrences[key])) * 100).toFixed(2)
    }

    return newMap
}