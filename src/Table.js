import React from 'react'

const Table = ({ countriesTableData }) => {
    return (
        <div className="app__table">
            {
                countriesTableData.map((countryData, index)=>{
                    const { country, cases } = countryData;
                    return(
                        <tr key={ index }>
                            <td>{ country }</td>
                            <td>{ cases }</td>
                        </tr>
                    )
                })
            }
        </div>
    )
}

export default Table
