import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getMemeById } from "../api/data.js";

const detailsTemplate = (meme, loggedInUserId) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title} </h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src=${meme.imageUrl}>
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p> ${meme.description} </p>
    
                <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                ${meme._ownerId === loggedInUserId
        ? html`
                <a class="button warning" href="/update/${meme._id}">Edit</a>
                <a href="/delete/${meme._id}">
                    <button class="button danger">Delete</button>
                </a>
                `
        : nothing
                }
            </div>
        </div>
    </section>
    `


export async function detailsView(ctx) {
    let memeId = ctx.params.id;
    let loggedInUserId;  // will remain undefined if nothing in localStorage

    // can do it with let isOnwer = meme._ownerId === loggedInUserId
    // will return true/false and then add it as argument
    // we can also get user id from our getUserData() metod in util.js
    if (localStorage.userData) {
        loggedInUserId = JSON.parse(localStorage.userData).id
    }

    let singleMeme = await getMemeById(memeId);
    ctx.render(detailsTemplate(singleMeme, loggedInUserId));
}