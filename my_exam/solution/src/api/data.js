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




