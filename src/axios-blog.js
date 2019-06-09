import axios from 'axios';
import {URL} from './Common';

const  instance = axios.create({
    baseURL: URL
});

export default instance;
