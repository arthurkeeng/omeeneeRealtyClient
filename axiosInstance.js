import axios from "axios"

const app = axios.create({
    baseURL : "https://omeeneerealtyapi.onrender.com",
    withCredentials : true
})

export default app