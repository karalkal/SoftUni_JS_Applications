import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getTheatreById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (theatre, isOwner) => html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${theatre.title}</h1>
                <div>
                    <img src=${theatre.imageUrl} />
                </div>
            </div>
    
            <div class="details">
                <h3>Theater Description</h3>
                <p>${theatre.description}</p>
                <h4>Date: ${theatre.date}</h4>
                <h4>Author: ${theatre.author}</h4>

                ${isOwner 
                ? html`
                <div class="buttons">
                    <a class="btn-delete" href="/delete/${theatre._id}">Delete</a>
                    <a class="btn-edit" href="/update/${theatre._id}">Edit</a>
                    <a class="btn-like" href="/like/${theatre._id}">Like</a>
                </div>
                `
                : nothing
                }
                
                <p class="likes">Likes: 0</p>
            </div>
        </div>
    </section>
        `

export async function detailsView(ctx) {
    let theatre = await getTheatreById(ctx.params.id);

    let loggedInUser = await getUserData()

    let isOwner = false                             // by default it's false

    if (loggedInUser) {
        isOwner = theatre._ownerId == loggedInUser.id  // true / false
    }

    ctx.render(detailsTemplate(theatre, isOwner));
}
