import axios from "axios";
import { useStateContext } from "./contexts/ContextProvider";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8001/'
});

axiosClient.interceptors.request.use((config) => {
    // const token = localStorage.getItem('ACCESS_TOKEN');
    // config.headers.Authorization = `Bearer ${token}`;
    const token = localStorage.getItem('ACCESS_TOKEN');
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return config;
})

// onFulfilled and onRejected
axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // debugger;
    const {response} = error;
    console.log(response.status);
    // unauthorized - invalid/non existent token
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    } // could handle other responses

    throw error;
})

export default axiosClient;