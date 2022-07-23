import { contacts } from "./contacts.js";

for (let contact of (contacts)) {
    console.log(contact)

    const container = document.querySelector('#contacts')
    container.innerHTML += `
    <div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${contact.name}</h2>
                <button class="detailsBtn">Details</button>
                <div class="details" id=${contact.id}>
                    <p>Phone number: ${contact.phoneNumber}</p>
                    <p>Email: ${contact.email}</p>
                </div>
            </div>
        </div>
    `
}