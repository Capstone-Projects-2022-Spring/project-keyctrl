import React, { useState } from "react";
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
          Test Settings
          <button class="buttons" onClick={() => setHidden(s => !s)}>
            <AiOutlineDown />
          </button>
        </div>
        {!hidden ?
          

                <>
                <div class="hiddenSettings">
                <div class="TitleSettings"><div class="capitalLetters">
            Capital Letters</div>
            <div class="punctuation">
              Punctuation
            </div>
            <div class="maxWord">
              Max Word Length
            </div>
            </div>
            
            <div class="TitleButtonSettings">
            <div class="slideButton">
              <label class="switch">
                <input type="checkbox"></input>
                <span class="slider"></span></label> </div>
                
            <div className="increOrDecre">
              <button class="countButton" onClick={decrementCount}> &lt; </button>
              {count}
              <button class="countButton" onClick={incrementCount}> &gt; </button>
            </div>
                <div class="slideButton2">
              <label class="switch">
                <input type="checkbox"></input>
                <span class="slider"></span></label></div>
                </div>
              <div class="BoxAndUploadSettings">
            <input id="box" type="text" name="text" placeholder="Paste custom word list here..." />
           
            <div class="secondOption">
              OR 
           <input type="file" name="file" id="file" class="inputfile" /><label for="file">Choose file</label><div>
           </div></div> </div>
           </div>
           </>
              
          
          : null}
      </div></>


  );
}