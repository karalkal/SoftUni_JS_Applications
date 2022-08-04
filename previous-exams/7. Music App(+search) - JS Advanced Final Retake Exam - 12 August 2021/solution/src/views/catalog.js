import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

import { getAllAlbums} from "../api/data.js";
import { getUserData } from "../util.js";

let loggedInUser = null                // just declare it, if value is assigned, will display details button

const homeTemplate = (albums) => html`
    <section id="catalogPage"> 
        <h1> All Albums</h1>

        ${albums.length > 0
            ? html`
            ${albums.map(createCard)}
            `
            : html`
            <p>No Albums in Catalog!</p>`
        }
    </section >
    `

const createCard = (item) => html`
    <div class="card-box">
    <img src="${item.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${item.name}</p>
                <p class="artist">Artist: ${item.artist}</p>
                <p class="genre">Genre: ${item.genre}</p>
                <p class="price">Price: $${item.price}</p>
                <p class="date">Release Date: ${item.releaseDate}</p>
            </div>

            ${loggedInUser
            ? html `
            <div class="btn-group">
                <a href="/details/${item._id}" id="details">Details</a>
            </div>
            `
            : nothing
            }
        </div>
    </div>
    `


export async function catalogView(ctx) {
    let allAlbums = await getAllAlbums()

    loggedInUser = getUserData()  // set value to it if data in localStorage

    ctx.render(homeTemplate(allAlbums))
}