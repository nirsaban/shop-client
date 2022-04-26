import Axios from "../helpers/axios"



class httpRequest {

    constructor(path) {
        this.path = path
    }
    async post(data) {
        return await Axios.post(this.path, {...data })
    }
    async postForm(formData) {

        return await Axios.post(this.path, formData,)
    }
    async get(params) {
        return await Axios.get(this.path, {...params })
    }
    async delete(id){
        return await Axios.delete(this.path,{data:{id}})
    }
}

export default httpRequest