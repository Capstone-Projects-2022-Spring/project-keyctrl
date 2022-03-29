import React, { useState } from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'

const ThemeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ThemeTitle = styled.div`
    padding-bottom: .5em;
`

const BaseThemeBox = styled.div`
    background: ${props => props.background};
    border-radius: 10%;
    border-style: solid;
    border-color: ${props => props.border};
    color: ${props => props.text};
    width: 6em;
    text-align: center;
    padding-top: 2em;
    padding-bottom: 2.25em;
    vertical-align: center;
    font-size: 1em;
    margin-left: .5em;
    margin-right: .5em;
      &:hover{
        transition: .25s;
        color: ${props => props.border};
        cursor: pointer;
    }
`
const StyledPopup = styled(Popup)`
    
  // use your custom style for ".popup-overlay"
  &-overlay {
    backdrop-filter: blur(10px);
  }
  // use your custom style for ".popup-content"
  &-content {
    padding: 1em;
    background: var(--primary-color);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 1em;
    border-style: solid;
    border-color: var(--selection-color);
  } 
`;

const FriendRequests = (ref) => {

    return (
        <div>
            <ThemeTitle>Theme</ThemeTitle>
            <ThemeContainer>
                <BaseThemeBox
                    background="var(--bg-color)"
                    border="var(--selection-color)"
                    text="var(--text-color)">
                </BaseThemeBox>
            </ThemeContainer>
            <StyledPopup
                ref={ref}
                position="center"
                modal
                closeOnDocumentClick
            >
                <BaseThemeBox
                    background="#262353"
                    border="#50E3C2"
                    text="#75749C">
                </BaseThemeBox>
            </StyledPopup>
        </div>
    )
}

export default FriendRequests