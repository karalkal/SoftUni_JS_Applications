import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMine } from "../api/data.js"
import { getUserData } from "../util.js"

const profileTemplate = (myItems) => html`
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>
        ${myItems.length > 0
        
        ? html`
                <div class="my-posts">
                ${myItems.map(createCard)}>
                </div>
        `
        : html`
                <h1 class="title no-posts-title">You have no posts yet!</h1>
        `
        }    
    </section>
    `

const createCard = (item) => html`
    <div class="post">
        <h2 class="post-title">${item.title}</h2>
        <img class="post-image" src=${item.imageUrl} alt=${item.title}>
        <div class="btn-wrapper">
            <a href="/details/${item._id}" class="details-btn btn">Details</a>
        </div>
    </div>
`


export async function profileView(ctx) {
    let currentUser = getUserData()

    let myPosts = await getMine(currentUser.id)

    ctx.render(profileTemplate(myPosts))
}