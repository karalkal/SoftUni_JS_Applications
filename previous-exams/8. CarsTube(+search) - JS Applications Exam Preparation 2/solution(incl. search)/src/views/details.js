import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getCarById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (car, isOwner) => html`
    <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${car.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${car.brand}</li>
                    <li><span>Model:</span>${car.model}</li>
                    <li><span>Year:</span>${car.year}</li>
                    <li><span>Price:</span>${car.price}$</li>
                </ul>
                <p class="description-para">${car.description}</p>

                ${isOwner
                ? html`
                <div class="listings-buttons">
                    <a href="/update/${car._id}" class="button-list">Edit</a>
                    <a href="/delete/${car._id}" class="button-list">Delete</a>
                </div>
                `
                : nothing                
                }
                
            </div>
        </section>
        `

export async function detailsView(ctx) {
    let car = await getCarById(ctx.params.id);

    let loggedInUser = await getUserData()

    let isOwner = false                             // by default it's false

    if (loggedInUser) {
        isOwner = car._ownerId == loggedInUser.id  // true / false
    }

    ctx.render(detailsTemplate(car, isOwner));
}
