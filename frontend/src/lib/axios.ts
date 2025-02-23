import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',

    },
    withCredentials: true, // Send cookies or authorization headers
});