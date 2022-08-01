import { setUserData, clearUserData } from "../util.js"
import { post, get } from "../api/api.js"

export async function login(email, password) {
    let result = await post('/users/login', { email, password })

    let userData = {
        username: result.username,
        email: result.email,
        id: result._id,
        token: result.accessToken
    }
    setUserData(userData)
    return result
}

// data to be send to the server upon registration can vary
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

export function logout() {
    get('/users/logout')
    clearUserData()
}