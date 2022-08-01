import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyMemes } from "../api/data.js";

const profileTemplate = (memes, currentUser) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
            <div class="user-content">
                <p>Username: ${currentUser.username}</p>
                <p>Email: ${currentUser.email}</p>
                <p>My memes count: ${memes.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
    
            ${memes.length > 0
            ? html`
            <!-- Display : All memes in database ( If any ) -->
            ${memes.map(createCard)}
            `
            : html`
            <!-- Display : If user doesn't have own memes  -->
            <p class="no-memes">No memes in database.</p>
            `
            }
    </section>
    `

const createCard = (item) => html`
    <!-- Display : All created memes by this user (If any) -->
    <div class="user-meme">
        <p class="user-meme-title">${item.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${item.imageUrl}>
        <a class="button" href="/details/${item._id}">Details</a>
    </div>
    `

export async function viewProfile(ctx) {
    let currentUser = JSON.parse(localStorage.userData)

    let myMemes = await getMyMemes(currentUser.id)
    ctx.render(profileTemplate(myMemes, currentUser))
}