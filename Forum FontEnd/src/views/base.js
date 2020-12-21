import axios from "axios"
const axiosBase = axios.create({
    baseURL: 'http://localhost:8070/api/',
    timeout: 1000
});

export default axiosBase