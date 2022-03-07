import { useState } from 'react'
import Datatable from './LeaderboardTable'


export default function DataSearch({ data }) {
    const [query, setQuery] = useState('');


    function search(rows) {
        const columns = rows[0] && Object.keys(rows[0])
        return rows.filter((row) => columns.some((column) =>
            row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
        );
    }
    return (
        <>
            <input className="search-bar"
                type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            />

            <Datatable data={search(data)} />
        </>
    );
}
