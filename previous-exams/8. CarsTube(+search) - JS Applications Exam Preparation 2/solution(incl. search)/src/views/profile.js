import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMine } from "../api/data.js"
import { getUserData } from "../util.js"

const profileTemplate = (myCars) => html`
    <section id="my-listings">
        <h1>My car listings</h1>
        <div class="listings">
    
            ${myCars.length > 0
            ? myCars.map(createCard)
            : html`
            <p class="no-cars"> You haven't listed any cars yet.</p>
            `
            }
        </div>
    </section>
    `

const createCard = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2> ${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
    `


export async function profileView(ctx) {
    let currentUser = await getUserData()
    let myCars = await getMine(currentUser.id)

    ctx.render(profileTemplate(myCars))
}