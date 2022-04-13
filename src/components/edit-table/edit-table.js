
import { MDBContainer } from 'mdb-react-ui-kit';
import React,{useEffect,useState} from 'react'
import { getStoredState } from 'redux-persist/es/integration/getStoredStateMigrateV4';
import httpRequest from '../../classes/httpRequest';
import Table from '../../ui/table/table'
const EditTable = ({path}) => {
    const [data,SetData] = useState(null)
    const [table,setTable] = useState({headers:[],tds:[]})
    useEffect(() => {
        (async () => {
            try {
                let destPath = path.split("/")[2]
                let response = await new httpRequest(`${destPath}/get`).get()
                SetData(response.data)
            } catch (error) {
               alert("ERROR") 
            }
        })()
    }, []);
    useEffect(() => {
        if(data){
            setTable({
                headers:Object.keys(data[0]).map(col => col.replaceAll("_"," ").toUpperCase()),
                tds:get_tds(Object.values(data))
            })
        }
    },[data])
const get_tds = (data) => {

}
return(
        <>
            <MDBContainer className='d-flex justify-content-center'>
             <Table headers = {table.headers} tds = {table.tds} />
            </MDBContainer>
        </>  

)








}


export default EditTable