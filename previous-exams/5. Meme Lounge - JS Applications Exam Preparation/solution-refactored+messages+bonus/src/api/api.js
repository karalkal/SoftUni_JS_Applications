import { notify } from '../notify.js';
import { getUserData, setUserData, clearUserData } from '../util.js'

let host = 'http://localhost:3030';

async function request(url, method, data) {
    let options = {
        method,
        headers: {}
    };

    // if any data, automatically put header and serialize data
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
    };

    // if something in localStorage, add token to auth header
    let userData = getUserData()
    if (userData) {
        options.headers['X-Authorization'] = userData.token
    }

    // send the request - full url, options {object}
    try {
        let response = await fetch(host + url, options)     //options stores the actual request object, i.e. method, headers, body

        if (response.ok == false) {
            if (response.status == 403) {  // Forbidden, can happen if invalid token is sent
                clearUserData();
            }
            let error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {       //No Content success status
            return response;               // in this case response.json() results in error
        } else {
            return response.json()
        }

    } catch (err) {
        // alert(err.message)
        notify(err.message)
        throw new Error(err.message)
    }
}


export async function get(url) {
    return request(url, 'get')    // will get default method, no data
}

export async function post(url, data) {
    return request(url, 'post', data)    // will assign post to method, data goes into option.body
}

export async function put(url, data) {
    return request(url, 'put', data)    // will assign put to method, data goes into option.body
}

export async function del(url) {
    return request(url, 'delete')    // will assign delete to method
}


