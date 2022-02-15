import React, {useEffect, useState} from 'react'
import './StatKeyboard.css'
import Image from "../../../assets/keyboard_shell.png"
import MissedKey from '../MissedKey/MissedKey';

const StatKeyboard = ({ letter_misses }) => {

    var total = null;
    var max = null;
    const map = JSON.parse(letter_misses);

    const calcTotal = () => {
        total = 0;
        max = Number.MIN_SAFE_INTEGER;
        Object.keys(map).map(el => {
            total += map[el];
            max = (max < map[el]) ? map[el] : max;
        });
        //console.log(total);
    }

    const getColor = (key) => {

        const ratio = map[key] / max;

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

    calcTotal();

    return (
        <div className="keyboard-base">
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
            <img className="keyboard-img" src={Image} />
            <div className="key1" id="q" />
            <div className="key1" id="w" />
            <div className="key1" id="e" />
            <div className="key1" id="r" />
            <div className="key1" id="t" />
            <div className="key1" id="y" />
            <div className="key1" id="u" />
            <div className="key1" id="i" />
            <div className="key1" id="o" />
            <div className="key1" id="p" />
            <div className="key1" id="a" />
            <div className="key1" id="s" />
            <div className="key1" id="d" />
            <div className="key1" id="f" />
            <div className="key1" id="g" />
            <div className="key1" id="h" />
            <div className="key1" id="j" />
            <div className="key1" id="k" />
            <div className="key1" id="l" />
            <div className="key1" id="z" />
            <div className="key1" id="x" />
            <div className="key1" id="c" />
            <div className="key1" id="v" />
            <div className="key1" id="m" />
            <div className="key1" id="b" />
            <div className="key1" id="n" />
        </div>
    )
}

export default StatKeyboard
