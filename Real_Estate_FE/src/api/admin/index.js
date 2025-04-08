import axios from "axios";
// axios.defaults.withCredentials= true;
const defaultAdminAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api/admin",
});
defaultAdminAxios.defaults.headers.common['Authorization']='Bearer '+ localStorage.getItem('adminToken');
export default defaultAdminAxios