import React from "react"
import "./Table.css"

const Table = props =>{
    return(
        <table className="w3-table-all">
            <thead>
                <tr> 
                    {props.columns.map((column, index) => {
                        return (
                            <th scope="col" key={index}>{column}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {props.rows.map((row, index) =>{
                    return (
                        <tr key={index}>
                            <th scope="row">{row[0]}</th>
                            {row.slice(1).map((cell, index) =>{
                                return (
                                    <td key={index}>{cell}</td>
                                )
                            })}
                        </tr>
                        
                    )
                }
                
                )}
            </tbody>
        </table>
    )
}

export default Table;