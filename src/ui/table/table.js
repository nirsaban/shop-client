import React, { useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';

const Table = ({ headers, tds ,updateDB}) => {
    const [edit, setEdit] = useState({})

    const handleChange = (event,index,col) => {
        const { value } = event.target
        tds[index][col] = value
    }
    const handleEdit = (index) => {
        if(edit) updateDB()
        setEdit(p => ({ ...p, [index]: !p[index] }))
       
    }
    return (
        <MDBTable striped className='border' responsive>
            <MDBTableHead>

                <tr>
                    {headers.map(col => {
                        return (
                            <th key={col} className='text-center'>{col}</th>
                        )
                    })}
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {tds.map((row, index) => {
                    return (
                        <tr>

                            {
                                Object.values(row).map((td,x) => {
                                    let content = !edit[index] ? (<td >{td}</td>) :
                                        (<td><input onChange={(event) => handleChange(event ,index,Object.keys(row)[x])}
                                         className="w-50" 
                                         type={!isNaN(td) ? "number" : "text"} defaultValue={td}/></td>)
                                    return (
                                        content
                                    )
                                })
                            }
                            <td><MDBIcon icon="edit" onClick={() =>  handleEdit(index)} ></MDBIcon></td>
                            <td><MDBIcon icon="trash" ></MDBIcon></td>
                        </tr>
                    )
                })}
            </MDBTableBody>
        </MDBTable>
    );
}

export default Table