console.log("RANKING SYSTEM TEST")
console.log("TEST 1 LOW MMR VS HIGH MMR 3RD")
var uname = 'Alex Ruiz';
var mmr = 1400;
console.log("Test 1 Start: " + uname + ": " + mmr + "RP Lobby MMR: " + 3500 + " Streak: " + 3);
mmr = mmr + changerank(3, mmr, 3500, 3);
console.log("FINALIZED TO: " + uname + ": " + mmr + "RP");
console.log("=============================================");
console.log("TEST 2 HIGH MMR VS LOW MMR WIN")
var uname = 'Andy Philips';
var mmr = 3400;
console.log("Test 2 Start: " + uname + ": " + mmr + "RP Lobby MMR: " + 1500 + " Streak: " + 6 + "->7");
mmr = mmr + changerank(1, mmr, 1500, 6);
console.log("FINALIZED TO: " + uname + ": " + mmr + "RP");
console.log("=============================================");
console.log("TEST 3 EQUAL MMR WIN")
var uname = 'Colin Harker';
var mmr = 2400;
console.log("Test 3 Start: " + uname + ": " + mmr + "RP Lobby MMR: " + 2750 + " Streak: " + 2 + "->3");
mmr = mmr + changerank(2, mmr, 2750, 2);
console.log("FINALIZED TO: " + uname + ": " + mmr + "RP");
console.log("=============================================");
console.log("TEST 4 SLIGHTLY HIGHER MMR VS LOWER MMR LOSS")
var uname = 'Jason Lemanna';
var mmr = 2800;
console.log("Test 4 Start: " + uname + ": " + mmr + "RP Lobby MMR: " + 2000 + " Streak: " + 1 + "->-1");
mmr = mmr + changerank(4, mmr, 2000, 1);
console.log("FINALIZED TO: " + uname + ": " + mmr + "RP");
console.log("=============================================");
console.log("TEST 5 HIGHER MMR VS MUCH LOWER MMR LOSS")
var uname = 'Maafia';
var mmr = 2000;
console.log("Test 5 Start: " + uname + ": " + mmr + "RP Lobby MMR: " + 1000 + " Streak: " + -6 + "->-7");
mmr = mmr + changerank(5, mmr, 1000, -6);
console.log("FINALIZED TO: " + uname + ": " + mmr + "RP");
console.log("=============================================");
console.log("TEST 6 LOWER MMR VS MUCH HIGHER MMR LOSS")
var uname = 'Li';
var mmr = 1500;
console.log("Test 6 Start: " + uname + ": " + mmr + "RP Lobby MMR: " + 3200 + " Streak: " + 2 + "->-1");
mmr = mmr + changerank(5, mmr, 3200, 2);
console.log("FINALIZED TO: " + uname + ": " + mmr + "RP");

//Placement with basevalues= 1st (+20), 2nd (+10), 3rd (+3), 4th (-10), or 5th (-20)
//Current = crrnt rank points | MatchAVG = AVG Rank points of lobby | Streak = current win/loss streak 3rd placement resets streak to 0
function changerank(placement, current, matchaverage, streak) {
    //LOBBY MMR DIFF MULTIPLIER
    rankdifference= matchaverage-current;
    //WILL BE TURNED NEGATIVE WHEN HIGHER THAN LOBBY POSITIVE WHEN LOWER
    mmrmultiplier = 0.1 * Math.round(rankdifference/300);
    console.log("MMR Multiplier: "+ mmrmultiplier + " %");

    //STREAKING
    currentstreak = streak;

    //OUTCOME Base
    result = 1;
    //1st and 2nd placement add 1 to streak OR if streak is negative sets it to 1
    //KEEP MMR MULTIPLIER POSITIVE FOR THE INCREASED DUB GAINS
    //3rd placement +1 doesn't affect win streak but resets negative streak to 0
    //4th and 5th placement add -1 to streak OR if streak is positive sets it to -1
    switch (placement) {     
        case 1:
            console.log("1st place = +20 base points")
            if(currentstreak<0){currentstreak=1}
            else{currentstreak += 1;}
            ptgain = 20;
            break;
        case 2:
            console.log("2nd place = +10 base points")
            if(currentstreak<0){currentstreak=1}
            else{currentstreak += 1;}
            ptgain = 10;
            break;
        case 3:
            console.log("3rd place = +3 base points")
            //TODO doesn't affect winstreak but resets loss streak
            if(currentstreak<0){currentstreak=0}
            ptgain = 3; 
            break;
        case 4:
            console.log("4th place = -10 base points")
            if(currentstreak>0){currentstreak=-1}
            else{currentstreak += -1;}
            ptgain = 10;
            result = 0;
            break;
        case 5:
            console.log("5th place = -20 base points")
            if(currentstreak>0){currentstreak=-1}
            else{currentstreak += -1;}
            ptgain = 20;
            result = 0;
            break;
    }
    //STREAK MULTIPLIER
    if(currentstreak > 2 || currentstreak < -2){
        streakmultiplier = currentstreak * 0.1;
        console.log("Streak :" + currentstreak + " Multiplier: " + streakmultiplier);
    }
    else{streakmultiplier = 0;}
    console.log(mmrmultiplier + streakmultiplier);
    if(mmrmultiplier + streakmultiplier < 0){
        ptgain = Math.round(ptgain*(-1+mmrmultiplier+streakmultiplier));
    }
    else{
        ptgain = Math.round(ptgain*(result+mmrmultiplier+streakmultiplier));
    }
    if(result == 0 && ptgain > 0){
        ptgain = ptgain * -1;
    }
    return ptgain;
  }