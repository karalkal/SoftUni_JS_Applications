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

export async function makeDonation(donation) {      // donation will come as an object
    return api.post('/data/donation', donation)}

export async function checkUserDonationStatus(petId, userId) {
    return api.get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}
export async function getTotalDonationsById(petId) {
    return api.get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`)
}




