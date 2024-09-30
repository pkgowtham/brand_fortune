import axios from 'axios';


export const axio = axios.create({
    baseURL:'http://localhost:5000/api/v1',
    timeout:5000, 
     
})
