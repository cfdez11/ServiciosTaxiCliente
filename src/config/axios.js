import axios from 'axios';

//siempre que llamemos a axios tendremos una url base 
const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export default clienteAxios;
