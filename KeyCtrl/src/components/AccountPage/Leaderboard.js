import React, {useEffect, useState} from "react";
export default function Datatable(){
    const [order,setorder]= useState("ASC");
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const columns = data[0] && Object.keys(data[0]);
   
    
  useEffect(() => {
    fetch('https://swapi.dev/api/people')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);
    
    const sorting=(col)=>{
      if(order==="ASC"){
          const sorted=[...data].sort((a,b)=>
          a[col].toLowerCase()>b[col].toLowerCase()?1:-1);
        
      
      setData(sorted);
      setorder("DSC");
    }
        if(order==="DSC"){
            const sorted=[...data].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase()?1:-1);
          
        
        setData(sorted);
        setorder("ASC")
    }
      
  };
function search(rows) {
    
        return rows.filter((row) => columns.some((column) =>
              row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
          )
        );
      }
      
      
    return(
        <> 
           <div id="pageselect">Page Select <div id="leaderboard">&lt;Leaderboard&gt;</div></div>
           <div className="topwpm">TOP WPM</div>
           <div className="searchBox">Leaderboard Search</div>
          
				
           <input className="search-bar"
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
             />
              
            <div class="scrollit">
                <table cellPadding={3} cellSpacing={3}>
                <thead>
                    <th onClick={()=>sorting("name")}>#</th>
                    <th onClick={()=>sorting("height")}>Username</th>
                    <th onClick={()=>sorting("mass")}>Rank</th>
                    <th onClick={()=>sorting("hair_color")}>Top WPM</th>
                    <th onClick={()=>sorting("skin_color")}>Avg WPM</th>
                    <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
                    
                </thead>
                <tbody>{data.map(row => <tr>{columns.map(column => <td>{row[column]}</td>)}
                </tr>)}
                </tbody>
                
            </table>
            
            
            </div>
            </>
    );
}