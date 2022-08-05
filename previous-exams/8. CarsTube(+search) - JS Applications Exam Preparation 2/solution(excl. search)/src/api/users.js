import { setUserData, clearUserData } from "../util.js"
import { post, get } from "./api.js"

export async function login(username, password) {
    let result = await post('/users/login', { username, password })

    let userData = {
        username: result.username,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
    return result
}

// data to be send to the server upon registration can vary
export async function register(username, password) {
    let result = await post('/users/register', { username, password })

    let userData = {
        username: result.username,
        id: result._id,
        token: result.accessToken,
    }
    setUserData(userData)
    return result
}

export function logout() {
    get('/users/logout')
    clearUserData()
}