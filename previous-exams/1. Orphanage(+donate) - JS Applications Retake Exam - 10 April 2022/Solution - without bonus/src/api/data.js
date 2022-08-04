import * as api from './api.js';


// export const login = api.login;
// export const register = api.register;
// export const logout = api.logout;


export async function getAll() {
    return api.get('/data/posts?sortBy=_createdOn%20desc')
}

export async function getMine(userId) {
    return api.get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function getSingleById(id) {
    return api.get('/data/posts/' + id)
}

export async function createPost(post) {
    return api.post('/data/posts', post)
}

export async function updatePost(id, post) {
    return api.put('/data/posts/' + id, post)
}

export async function deletePost(id) {
    return api.del('/data/posts/' + id)
}




