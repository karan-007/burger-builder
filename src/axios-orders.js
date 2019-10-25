import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://my-burger-9c14b.firebaseio.com/'
});

export default instance;