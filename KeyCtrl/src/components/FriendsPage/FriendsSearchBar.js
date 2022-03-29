import React, { useState } from "react";
import "'../../styles/FriendsSearchBar.css";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar({data}) {
  const [nameFilter, setNameFilter] = useState([]);
  const [nameSearched, setNameSearched] = useState("");

  const handleNameFilter = (event) => {
    const nameEntered = event.target.value;
    setNameSearched(nameEntered);
    const filteredData = data.filter((value) => {
      return value.username.toLowerCase().includes(nameEntered.toLowerCase());
    });

    if (nameEntered === "") {
      setNameFilter([]);
    } else {
      setNameFilter(filteredData);
    }
  };

  return (
    <div className="search-box">
       <button class="btn-search"><SearchIcon/></button>
      <input type="text" className="input-search"
          placeholder={"Seach for friends..."}
          value={nameSearched}
          onChange={handleNameFilter}
        />
        
      {nameFilter.length !== 0 && (
        <div className="nameResults">
          {nameFilter.map((value) => {
            return (
              <a className="nameFound" href={value.link} >
                <p>{value.username} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}