import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllOffers } from "../api/data.js";

const catalogTemplate = (allOffers) => html`
    <section id="dashboard">
        <h2>Job Offers</h2>

        ${allOffers.length > 0
        ? allOffers.map(createCard)
        : html`  <h2>No offers yet.</h2>  `        
        }
        
    </section>
`

const createCard = (offer) => html`
    <div class="offer">
            <img src=${offer.imageUrl} alt="example1" />
            <p>
                <strong>Title: </strong><span class="title">${offer.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
            <a class="details-btn" href="/details/${offer._id}">Details</a>
        </div>
    `


export async function catalogView(ctx) {
    let allOffers = await getAllOffers()

    ctx.render(catalogTemplate(allOffers))
}