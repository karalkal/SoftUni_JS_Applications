import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

import { getAllPets } from "../api/data.js";


const catalogTemplate = (allPets) => html`
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
            ${allPets.length > 0
            ? allPets.map(createCard)
            : html`
            <!--If there is no pets in dashboard-->
            <div>
                <p class="no-pets">No pets in dashboard</p>
            </div>
            `}
        </div>
    </section>
    `

const createCard = (item) => html`
    <div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src=${item.image}>
        </article>
        <h2 class="name">${item.name}</h2>
        <h3 class="breed">${item.breed}</h3>
        <div class="action">
            <a class="btn" href="/details/${item._id}">Details</a>
        </div>
    </div>
    `


export async function catalogView(ctx) {
    let allPets = await getAllPets()

    ctx.render(catalogTemplate(allPets))
}