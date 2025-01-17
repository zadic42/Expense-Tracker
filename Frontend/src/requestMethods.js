import axios from 'axios' ;

const BASE_URI = "https://expense-tracker-backend-g0e8.onrender.com"

export const publicRequest = axios.create({
    baseURL:BASE_URI ,
});
