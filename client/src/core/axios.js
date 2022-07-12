

import axios from 'axios'
import cookie from 'cookie_js'

export const get_token = () => {
    return  cookie.get('token')
}

export const instance = axios.create({
    // baseURL: `http://localhost:8080`,
    baseURL: `https://users-2020.herokuapp.com/`,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${get_token()}`,
    },
});