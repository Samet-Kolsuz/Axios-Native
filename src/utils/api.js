import axios from "axios";


const api = axios.create({
    baseURL:'https://fakestoreapi.com',

    headers:{
        'content-type':'application/json'
    }

})

export default api;