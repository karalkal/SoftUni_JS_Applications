import * as api from './api.js';


// export const login = api.login;
// export const register = api.register;
// export const logout = api.logout;


export async function getAllPets() {
    return api.get('/data/pets?sortBy=_createdOn%20desc&distinct=name')
}

export async function getPetById(id) {
    return api.get('/data/pets/' + id)
}

export async function createPet(pet) {
    return api.post('/data/pets', pet)
}

export async function updatePet(id, pet) {
    return api.put('/data/pets/' + id, pet)
}

export async function deletePet(id) {
    return api.del('/data/pets/' + id)
}




