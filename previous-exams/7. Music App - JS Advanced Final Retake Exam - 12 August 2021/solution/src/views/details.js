import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getalbumById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (album, isOnwer) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${album.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">
                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: $${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>Description: ${album.description}</p>
                </div>
    
                <!-- Only for registered user and creator of the album-->
                ${isOnwer
        ? html`
                <div class="actionBtn">
                    <a href="/update/${album._id}" class="edit">Edit</a>
                    <a href="/delete/${album._id}" class="remove">Delete</a>
                </div>
                `
        : nothing
    }
            </div>
        </div>
    </section>
    `

export async function detailsView(ctx) {
    let albumId = ctx.params.id;
    let album = await getalbumById(albumId);

    let loggedInUser = getUserData()

    let isOnwer = album._ownerId === loggedInUser.id  // true / false

    ctx.render(detailsTemplate(album, isOnwer));
}