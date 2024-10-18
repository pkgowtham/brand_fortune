import axios from 'axios';


export const axio = axios.create({
    // baseURL:'http://3.108.100.249/api/v1',
     baseURL:'http://localhost:5000/api/v1',
    timeout:5000, 
     
})
