import React, { useState } from "react";
import "./tests.css"
import '../../styles/TypingTestSettings.css'
import { AiOutlineDown } from "react-icons/ai";

export default function TypingSettings() {

  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(true);
  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
  };
  return (
    
    <>
      <div class="header">
      <div class="test-header">
      <h3>Test Settings<div/>
      <button class="buttons"  onClick={() => setHidden(s => !s)}>
      <AiOutlineDown/>
      </button></h3>
      </div>{!hidden ? 
       <div class="dropdown">
          <div class="dropdown-content">
          <div class="row">
            
            <div class="capitalLetters">
              <h3>Capital Letters
              </h3> <label class="switch">
                <input type="checkbox"></input>
                <span class="slider"></span></label>
                </div>
              <div class="addWordsBox">
                <input id="box" type="text" name="text" placeholder="Paste custom word list here..." /> </div>
              <input type="submit" value="Submit" class="submitBox" />
           

            <div class="punctuation">
              <h3>Punctuation</h3>
              <label class="switch">
                <input type="checkbox"></input>
                <span class="slider"></span></label>
            </div>

            <div class="secondOption">
              OR
            </div>

            <div class="maxWord">
              <h3>Max Word Length</h3>
              </div>
              <div className="increOrDecre">
                <button class="countButton" onClick={decrementCount}> &lt; </button>
                {count}
                <button class="countButton" onClick={incrementCount}> &gt; </button>
              </div>

              <div class="addFile">

                <input type="file" name="file" id="file" class="inputfile" />

                <label for="file">Choose file</label></div>
            
            <div>
            </div>
          </div>
        </div>
      </div>
      : null}
    </div></>
    

  );
}