
![KC_Final_trim](https://user-images.githubusercontent.com/53317006/158295058-cf117398-aebd-49a9-99b5-b62e3cabd82d.png)

### Created by: Jason, Colin, Abdul, Melanie, Andy, Alex, and Li

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

## Installation Instructions
<p>Though we are building a web app, it is necessary that we include installation instructions since our application is not yet hosted online. Follow the below steps to install a local instance of the application. The multiplayer server should be available to you. This means you'll be able to play with your friends at any time as long as it is running, even from your local instance of the app.</p>

```
git clone https://github.com/Capstone-Projects-2022-Spring/project-keyctrl.git
cd project-keyctrl\KeyCtrl
npm i
npm install request-promise
npm install request
npm start
```

## Using the Release: How to Test
<p>This release changed up a bunch of different modules, some such major changes are to the multiplayer, Account Statistics, and Friend invites. The testing steps for each element are listed below.</p>  
Friend Invitations & Profile Viewing
    -Login to the site from the button on the far right of the top UI 
    -Click "Login with Google" in the popup modal  
    -Sign in with your respective Google Account
    -Open up the friend list module and click on the three dots next to a friend (if you find yourself friendless you'll need to add one if you suffer from no friends, make another account in a new tab and add yourself then invite yourself)
    -From here you can see you've automatically created a lobby using your own ID other players can join normally without an invite if they enter in your ID
    -If you're the receiver of the invite a popup will appear in the top right and you'll be prompted to join
    -To test the profile viewing you can click those same three dots to select view profile and a popup module will appear that'll allow you to see their account stats
Multiplayer Changes
    -Join a private lobby and complete a match
    -The leave button appears in private lobbys from the start but ready up only appears at game end
    -To test the post game leaderboard when the popup appears you're given two buttons next to other logged in users that allow you to view their profiles or ad them as a friend
    -To test the spectator mode join a full lobby or alternatively a game in progress and you'll automatically be put into spectator mode and will be able to view the racers.
Username Editing
    -You can edit your username by going to the setting page and clicking the button next to your name and a popup will appear that'll allow you to update your username.
## Patch Notes
- Release notes indicating what is new
v3.0 Milestone 3
```
-Ready up and leave buttons on private lobbies
  -Private lobbies now has ready up buttons to continue playing and leave buttons to disconnect from the lobby
-Endgame Leaderboard UI update
  -New endgame screen that better displays users and allows you to add opponents as well as view their profile
-View Profiles
  -You can now view other user's profiles on your friendlist or through the post game leaderboard
-Friend Invites
  -Users on your friendlist can be invited to a private game
-Spectator Mode
  -When a joined game is already full you're now able to spectate the match
-Account Stats
  -Account stats are now live updating and new statistics can be viewed making changes
-Username Editing
  -User names can now be edited in settings (notice only the name prefix will change not your numbers)
```

v2.0 Milestone 2
```
-New UI
    -New, more compact and easily navigable UI
-Friend List
    -Add friends by ID, receive requests from other players and either accept or deny them.
-Multiplayer Find Match
    -Find game option added in addition to private lobbies to be automatically paired with other currently searching players
```

v1.0 Milestone 1
```
-Google Sign In 
  -Use your Google account to login to our application.
-Multiplayer 
  -Connect to a custom lobby and play with your friends to see who has the highest words per minute!
-Theme Select 
  -Change the look and feel of KeyCTRL with theme selection.
```

- Source Code For Release
```
git clone https://github.com/Capstone-Projects-2022-Spring/project-keyctrl
```
