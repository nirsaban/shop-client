import Axios from "../helpers/axios"

const login = async (params) => {

    try {
        return await  Axios.post("user/login",{...params})
    } catch (error) {
        
        return error 
    }
}

const register = async (params) => {
    try {
        return await  Axios.post("user/register",{...params})
    } catch (error) {
       
        return error 
    }
}

export {
    login,
    register
}