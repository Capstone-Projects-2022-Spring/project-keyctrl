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

const ChangeTheme = styled.div`
    margin-left: .5em;
    margin-right: .5em;
    margin-top: 1em;
    padding: .5em;
    border-radius: .5em;
    border: 0px;
    font-size: .5em;
    background: var(--primary-color);
    color: var(--text-color); 
    &:hover{
        transition: .25s;
        color: var(--selection-color);
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


const ThemeSelect = ({updateOptions}) => {

    const [themeName, setThemeName] = useState(document.documentElement.getAttribute('data-theme'))

    const changeTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        setThemeName(document.documentElement.getAttribute('data-theme'))
        updateOptions(theme);
    }

    return (
        <div>
            <ThemeTitle>Theme</ThemeTitle>
            <ThemeContainer>
                <BaseThemeBox
                    background="var(--bg-color)"
                    border="var(--selection-color)"
                    text="var(--text-color)">
                    {themeName}
                </BaseThemeBox>
            </ThemeContainer>
            <StyledPopup
                trigger={<ChangeTheme>Change Theme</ChangeTheme>}
                position="center"
                modal
                closeOnDocumentClick
            >
                <BaseThemeBox
                    background="#262353"
                    border="#50E3C2"
                    text="#75749C"
                    onClick={() => changeTheme('default')}>
                    default
                </BaseThemeBox>
                <BaseThemeBox
                    background="#282A36"
                    border="#BD93F9"
                    text="#6272A4"
                    onClick={() => changeTheme('dracula')}>
                    dracula
                </BaseThemeBox>
                <BaseThemeBox
                    background="#282828"
                    border="#FE8019"
                    text="#928374"
                    onClick={() => changeTheme('gruvbox')}>
                    gruvbox
                </BaseThemeBox>
                <BaseThemeBox
                    background="#562135"
                    border="#FFE7DE"
                    text="#E9B1CD"
                    onClick={() => changeTheme('sakura')}>
                    sakura
                </BaseThemeBox>
                <BaseThemeBox
                    background="#060621"
                    border="#f280c6"
                    text="#6688c1"
                    onClick={() => changeTheme('abyss')}>
                    abyss
                </BaseThemeBox>
                <BaseThemeBox
                    background="#221a0f"
                    border="#a63058"
                    text="#a57a4c"
                    onClick={() => changeTheme('kimbie')}>
                    kimbie
                </BaseThemeBox>
                <BaseThemeBox
                    background="#272822"
                    border="#b67534"
                    text="#888456"
                    onClick={() => changeTheme('monokai')}>
                    monokai
                </BaseThemeBox>
                <BaseThemeBox
                    background="#111111"
                    border="#ce916b"
                    text="#efffff"
                    onClick={() => changeTheme('contrast')}>
                    contrast
                </BaseThemeBox>
                <BaseThemeBox
                    background="#f3f3f3"
                    border="#007acc"
                    text="#999999"
                    onClick={() => changeTheme('light')}>
                    light
                </BaseThemeBox>
                <BaseThemeBox
                    background="#d5d6db"
                    border="#71b6bd"
                    text="#5c626d"
                    onClick={() => changeTheme('tokyo-light')}>
                    tokyo-light
                </BaseThemeBox>
                <BaseThemeBox
                    background="#1f2335"
                    border="#3d59a1"
                    text="#c0caf5"
                    onClick={() => changeTheme('tokyo-dark')}>
                    tokyo-dark
                </BaseThemeBox>
                <BaseThemeBox
                    background="#122738"
                    border="#fbc401"
                    text="#a5a6a7"
                    onClick={() => changeTheme('cobalt')}>
                    cobalt
                </BaseThemeBox>
                <BaseThemeBox
                    background="#99582a"
                    border="#6f1d1b"
                    text="#ffe6a7"
                    onClick={() => changeTheme('wood')}>
                    wood
                </BaseThemeBox>
                <BaseThemeBox
                    background="#122738"
                    border="#b67534"
                    text="#c0caf5"
                    onClick={() => changeTheme('bronze')}>
                    bronze
                </BaseThemeBox>
                <BaseThemeBox
                    background="#282828"
                    border="#C0C0C0"
                    text="#c0caf5"
                    onClick={() => changeTheme('silver')}>
                    silver
                </BaseThemeBox>
                <BaseThemeBox
                    background="#464646"
                    border="#fbc401"
                    text="#fce981"
                    onClick={() => changeTheme('gold')}>
                    gold
                </BaseThemeBox>
            </StyledPopup>
        </div>
    )
}

export default ThemeSelect