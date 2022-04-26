
import { MDBContainer } from 'mdb-react-ui-kit';
import React,{useEffect,useState} from 'react'
import { getStoredState } from 'redux-persist/es/integration/getStoredStateMigrateV4';
import httpRequest from '../../classes/httpRequest';
import apiRoutes from '../../config/routesApi.json'

import { MDBTable, MDBTableHead, MDBTableBody,  MDBIcon } from 'mdb-react-ui-kit';
const EditTable = ({path,ths,tds,setState,param}) => {
const [data,SetData] = useState(null)

const  deleteItem = async({id}) => {
    try {
        const response = await (new httpRequest(path)).delete(id);
        setState(p => ({
         ...p, 
         [param]: response.data.result
     }))
     } catch (error) {
        
    } 
 }
return(
        <>
            <MDBContainer className='d-flex justify-content-center'>
            <MDBTable striped className='border' responsive>
                        <MDBTableHead>
                            <tr>
                                {Object.keys(ths).map(col => {

                                    return (
                                        <th key={col} className='text-center'>{col}</th>
                                    )
                                })}
                                <th>DELETE</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody >
                            {Object.values(tds).map((row, index) => {
                                return (
                                    <tr >
                                        {
                                            Object.values(row).map((td, x) => {

                                                let content = (
                                                    <td className='text-center'>{
                                                    !Array.isArray(td) ? td :
                                                    typeof td[0] == "string"
                                                    ?
                                                    td.map(img  => {
                                                        return(
                                                            <img height={"30px"} width = {'30px'} style = {{margin : '2px'}} src ={img}/>
                                                        )
                                                    })
                                                    : 
                                                     td.map(td => td.product_name).join(" ")
                                    
                                                     }
                                                     </td>);
                                                return (
                                                    content
                                                )
                                            })
                                        }
                                        <td onClick={() => deleteItem(row)}><MDBIcon icon="trash" ></MDBIcon></td>
                                    </tr>
                                )
                            })}
                        </MDBTableBody>
                    </MDBTable>
            </MDBContainer>
        </>  

)








}


export default EditTable