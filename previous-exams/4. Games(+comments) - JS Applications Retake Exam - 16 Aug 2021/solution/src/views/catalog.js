import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

import { getAllGames } from "../api/data.js";


const homeTemplate = (allGames) => html`
    <section id="catalog-page">
        <h1>All Games</h1>
        <!-- Display div: with information about every game (if any) -->
        ${allGames.length > 0
        
        ? allGames.map(createCard)
        : html `
        <!-- Display paragraph: If there is no games  -->
        <h3 class="no-articles">No articles yet</h3>
        `}
    </section>
    `

const createCard = (item) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src=${item.imageUrl}>
            <h6>${item.category}</h6>
            <h2>${item.title}</h2>
            <a href="/details/${item._id}" class="details-button">Details</a>
        </div>    
    </div>
    `


export async function catalogView(ctx) {
    let allGames = await getAllGames()

    ctx.render(homeTemplate(allGames))
}