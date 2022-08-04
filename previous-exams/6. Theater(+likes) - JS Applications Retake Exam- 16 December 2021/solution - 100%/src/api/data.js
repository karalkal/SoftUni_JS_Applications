import * as api from './api.js';


// export const login = api.login;
// export const register = api.register;
// export const logout = api.logout;


export async function getAllTheatres() {
    return api.get('/data/theaters?sortBy=_createdOn%20desc&distinct=title')
}

export async function getMine(userId) {
    return api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function getTheatreById(id) {
    return api.get('/data/theaters/' + id)
}

export async function createTheatre(theatre) {
    return api.post('/data/theaters', theatre)
}

export async function updateTheatre(id, theater) {
    return api.put('/data/theaters/' + id, theater)
}

export async function deleteTheatre(id) {
    return api.del('/data/theaters/' + id)
}




