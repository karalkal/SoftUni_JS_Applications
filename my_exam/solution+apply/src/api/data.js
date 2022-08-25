import * as api from './api.js';


// export const login = api.login;
// export const register = api.register;
// export const logout = api.logout;


export async function getAllOffers() {
    return api.get('/data/offers?sortBy=_createdOn%20desc')
}

export async function getOfferById(id) {
    return api.get('/data/offers/' + id)
}

export async function createOffer(offer) {
    return api.post('/data/offers', offer)
}

export async function updateOffer(id, offer) {
    return api.put('/data/offers/' + id, offer)
}

export async function deleteOffer(id) {
    return api.del('/data/offers/' + id)
}

export async function getApplicationsById(offerId) {
    return api.get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
}

export async function checkApplicationStatus(offerId, userId) {
    return api.get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function postApplication(offer) {  // body with the following shape: {  offerId  }`
    return api.post('/data/applications', offer)
}