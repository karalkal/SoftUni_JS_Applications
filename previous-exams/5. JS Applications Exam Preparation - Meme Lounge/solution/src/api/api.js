import { getUserData, setUserData, clearUserData } from '../util.js'

let hostname = 'http://localhost:3030';

async function request(url, options) {
    try {
        let response = await fetch(hostname + url, options)     //options stores the actual request object, i.e. method, headers, body

        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {     //No Content success status
            return response;
        } else {
            return response.json()
        }
    } catch (err) {
	window.alert(err.message)
        throw new Error(err.message)
    }
}


function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    }

    if (data != undefined) {        // if any data, automatically put header and serizlize data
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
    }

    let userData = getUserData()
    if (userData) {
        options.headers['X-Authorization'] = userData.token
    }

    return options
}

export async function get(url) {
    return request(url, createOptions())    // will get default method, no data
}

export async function post(url, data) {
    return request(url, createOptions('post', data))    // will assign post to method
}

export async function put(url, data) {
    return request(url, createOptions('put', data))    // will assign put to method
}

export async function del(url) {
    return request(url, createOptions('delete'))    // will assign delete to method
}

export async function login(email, password) {
    let result = await post('/users/login', { email, password })

    let userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
    return result
}

export async function register(username, email, password, gender) {
    let result = await post('/users/register', { username, email, password, gender })

    let userData = {
        username: result.username,
        email: result.email,
        id: result._id,
        token: result.accessToken,
    }
    setUserData(userData)
    return result
}

export async function logout() {
    get('/users/logout')
    clearUserData()
}
