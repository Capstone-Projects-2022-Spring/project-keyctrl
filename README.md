# Key Ctrl
### Jason, Colin, Melanie, Andy, Alex, Li, Abdul

## Project Description

<p>KeyCTRL is a web application where users can test their typing skills, track their improvement, and race against their friends to see who types the fastest. There are a wide variety of typing websites available that achieve one of these core aspects. However, there are few websites that provide this amount of typing options and features. The goal of KeyCTRL is to provide a “one-stop shop” for people to enjoy typing both the train and to have fun. </p>
<p>To achieve this goal, KeyCTRL will be outfitted with a robust set of features and typing modes, giving the user a variety of options to tailor their typing experience. Users will be able to play a training mode, where incorrect keypresses halt progress and force typists to learn the letter’s position, a speed mode, where errors are allowed and result in a penalty if not corrected, and a multiplayer mode, where users can race against their friends or other players to rank up and earn rewards. </p>
<p>To keep users engaged we plan to focus the multiplayer mode on the ranked system. There will be different ranked tiers and achieving one of these ranks will provide tier-specific rewards. These incentives might include things like website themes, account titles, profile badges, and more! To go along with the ranked system, there will be leaderboards so users can compare themselves against the rest of the player base. This will allow for long term goals of climbing the ranked ladder. 
</p>

## Conceptual Design

<p>The front end of the project is built with ReactJS. This allowed us to create a user-friendly interface that has multi-page functionality. The main interaction comes in the form of a vertical navigation bar that runs up the left side of the webapp. Here, users can find icons leading to pages for different typing modes, account statistics, or settings. </p>
<p>The backend combines three AWS services: RDS, Lamba, and API-Gateway and the software uses Postman requests to communicate with hosted APIs. This lets us tie user actions back to database so we can update user statistics. Different actions, like taking a basic typing test, will trigger API requests to update the user’s account with new information based on their performance. </p>
<p>We plan to use Socket.io to create the multiplayer mode. This will be achieved through creating server net code and hosting said server on a local machine. Key aspects of the multiplayer are the ability to make private matches to play with friends as well as be matched based on your rank against other players at your skill level.</p>


## Background

<p>On the market, there are various typing tests and typing games. This one strives to take the best aspects from those that exist and consolidate them into one spot. For example, there are many stand-alone type trainers, speed tests, and type races, but practically none that put it all together. The plan is to be so feature rich that it could replace all other existing typing tests. </p>
<p>TypeRacer, for example, is a very popular online typing website where users race against their friends and others to type a quote from popular media. It even allows for some basic statistics tracking. Where KeyCTRL will differ is in the other typing modes it offers, the more comprehensive statistics tracking, a deeper ranked systems based on more than just average typing speed but also recent performance, and a customizable typing experience both in its looks and testing functionality. </p>
<p>Many other typing applications that do offer a customizable experience and better statistics, such as TypeTest.io, Keybr, and typings.gg, lack a multiplayer mode and typically only allow for training or speed tests, not both.</p>
![image](https://user-images.githubusercontent.com/53317006/158291758-cbc7b54a-6431-47b9-ba48-ab257ee9464d.png)



## Developer Install

- Install Node JS 16.13.0 LTS ([External Site](https://nodejs.org/en/))
- Download Dependencies ([More Details](https://github.com/CIS3296SoftwareDesignF21/prj-01-typingtest/network/dependencies))
```
npm install -g electron
npm install electron-squirrel-startup --save
npm install react react-dom --save
npm install react-scripts --save
npm install -g node@10.9.0
npm install react-spring
npm install mysql
npm install web-vitals
npm install styled-components
npm install react-icons
npm install material-design-icons
npm i -D electron-devtools-installer && npm i -D concurrently@5.2.0 wait-on@5.1.0 && npm i electron-is-dev@1.2.0
npm i postman-request
npm install random-words
npm install --save request-promise
npm install react-loader-spinner --save
```
- Clone Repo
```
git clone https://github.com/CIS3296SoftwareDesignF21/prj-01-typingtest
```
## Open & Run 
- Recommemded IDE: [Visual Studio Code](https://code.visualstudio.com/download)
### Open Source Code
- Navigate to Cloned Repository Direcctory
- Utilize VS Code 
```
cd prj-01-typingtest/typing-test
code .
```
### Run
-Run .bat file to connect to server and open electron app
```
cd prj-01-typingtest/typing-test
./Open.bat
```

## [UML](https://github.com/CIS3296SoftwareDesignF21/prj-01-typingtest/blob/Revise-ReadMe/UML/UML.md)

## [User Personas](https://github.com/CIS3296SoftwareDesignF21/prj-01-typingtest/blob/Revise-ReadMe/UserPersonas/UserPersonas.md)



## Releases
- [0.1.0-pre-release](https://github.com/CIS3296SoftwareDesignF21/prj-01-typingtest/releases/download/v0.1.0/typing-test-win32-x64.rar)

- [0.2.0-pre-release](https://github.com/CIS3296SoftwareDesignF21/prj-01-typingtest/releases/download/v0.2.0-pre-release/typing-test-win32-x64.zip)

- [0.3.0-pre-release](https://github.com/CIS3296SoftwareDesignF21/prj-01-typingtest/releases/download/v0.3.0-pre-release/typing-test-win32-x64.zip)

- [1.0.0-release](https://github.com/CIS3296SoftwareDesignF21/prj-01-typingtest/releases/tag/v1.0.0)

