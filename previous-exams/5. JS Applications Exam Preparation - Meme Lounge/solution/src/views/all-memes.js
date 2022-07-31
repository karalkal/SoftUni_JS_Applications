import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllMemes } from "../api/data.js";

const homeTemplate = (memes) => html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
    
            ${memes.length > 0
            ? html`
            <!-- Display : All memes in database ( If any ) -->
            ${memes.map(createCard)}
            `
            : html`
            <!-- Display : If there are no memes in database -->
            <p class="no-memes">No memes in database.</p>
            `
            }
        </div>
    </section>
    `

const createCard = (item) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${item.title}</p>
                <img class="meme-image" alt="meme-img" src=${item.imageUrl}>
            </div>
            <div id="data-buttons">
                <a class="button" href="/details/${item._id}">Details</a>
            </div>
        </div>
    </div>

    
    `

export async function viewAll(ctx) {
    let allMemes = await getAllMemes()
    ctx.render(homeTemplate(allMemes))
}