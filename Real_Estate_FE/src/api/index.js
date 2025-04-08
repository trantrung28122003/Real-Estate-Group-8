import axios from "axios";
// axios.defaults.withCredentials= true;
const defaultAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});
defaultAxios.defaults.headers.common['Authorization']='Bearer '+ localStorage.getItem('token');
export default defaultAxios