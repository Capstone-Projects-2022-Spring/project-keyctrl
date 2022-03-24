import React from 'react'
import PropTypes from 'prop-types'
import '../../../styles/FriendsList.css'


function changeStat(current){
    switch(current){
        case "Online":
            console.log('STATUS CHANGED FROM ONLINE TO AWAY');
            alert(`STATUS CHANGED FROM ONLINE TO AWAY`);
            break;
        case "Away":
            console.log('STATUS CHANGED FROM AWAY TO ONLINE');
            alert(`STATUS CHANGED FROM AWAY TO ONLINE`);
            break;
        default:
            console.log(`Sorry, something went wrong`);
    }
}

function collapse(){
    alert(`this will collapse the menu`);
}

function addFriend(){
    alert(`this will bring a popup to add a friend`);
}


const FriendsList = ({status, username, pfp}) => {
  return (
    <div className='maincontainer'>
        <table width="100%">
            <tr>
                <td width="100px"><img className='pfp' src={pfp} alt="Profile"/></td>
                <td><h2>{username}</h2><p className='status' onClick={() =>changeStat(`${status}`)}>🟢{status}</p></td>
                <td width="50px"><img src="https://cdn.discordapp.com/attachments/682927634904252474/952800742522109962/right-arrow-1438234-1216195.png" alt="Expand" width="50" height="50" onClick={() =>collapse()}/></td>
            </tr>
        </table>
        <div className='lookup'>
            <img src="https://cdn.discordapp.com/attachments/682927634904252474/952833865750294538/search-13-xxl_114196.png" alt="filter person" width="30" height="30" style={{margin:"5px", float:"left"}}></img>
            <input placeholder="Filter" id="filter" onkeyup="filter()" style={{margin:"8px", height:"20px"}}></input>
            <img src="https://cdn.discordapp.com/attachments/682927634904252474/952834095128403978/add-person-1767897-1502150.png" alt="add person" width="30" height="30"  onClick={() =>addFriend()} style={{margin:"5px", float:"right"}}></img>
        </div>
        <table id="friends">
            <tr>
                <td><img className='pfpfriend' src={pfp} alt="Friend's Profile"/></td>
                <td><h2>Alex</h2><p className='status'>🟢Status:</p></td>
            </tr>
        </table>
    </div>
  )
}

FriendsList.defaultProps = {
    username: 'no one',
    status: 'Online',
    pfp: 'https://polybit-apps.s3.amazonaws.com/stdlib/users/notedwin/profile/image.png?1630540464656'
}

Headers.propTypes = {
    username: PropTypes.string.isRequired,
    status: PropTypes.string,
    pfp: PropTypes.string.isRequired,
}

export default FriendsList

function filter(){
    var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("filter");
      filter = input.value.toUpperCase();
      table = document.getElementById("friends");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }       
      }
    }