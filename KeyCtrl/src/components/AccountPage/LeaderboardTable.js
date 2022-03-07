import React from "react";

export default function Datatable({ data }) {
    //creating header for each key, aka titles 
    const columns = data[0] && Object.keys(data[0]);

    return (
        <>
            <div class="scrollit">
                <table cellPadding={3} cellSpacing={3}>

                    <thead>
                        <tr>{data[0] && columns.map((heading) => <th>{heading}</th>)}</tr>
                    </thead>
                    <tbody>{data.map(row => <tr>{columns.map(column => <td>{row[column]}</td>)}
                    </tr>)}
                    </tbody>

                </table></div>
        </>
    );
}