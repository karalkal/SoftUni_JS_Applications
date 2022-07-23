import { contacts } from "./contacts.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

const container = document.getElementById('contacts')

let cardTemplate = (contact) => {
    return html`
    <div class="contact card">
        <div>
            <i class="far fa-user-circle gravatar"></i>
        </div>
        <div class="info">
            <h2>Name: ${contact.name}</h2>
            <button class="detailsBtn">Details</button>
            <div class="details" id=${contact.id}>
                <p>Phone number: ${contact.phone}</p>
                <p>Email: ${contact.email}</p>
            </div>
        </div>
    </div>
    `
};



render(contacts.map(cardTemplate), container)

