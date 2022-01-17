import axios from 'axios';

export const makeRequest = axios.create({
    baseURL: 'https://invoicesapi20210913135422.azurewebsites.net/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    }
});