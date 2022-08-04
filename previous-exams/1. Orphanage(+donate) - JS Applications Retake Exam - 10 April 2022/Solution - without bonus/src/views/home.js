import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";


const homeTemplate = (allItems) => html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>

        ${allItems.length > 0
            ? html `
                    <div class="all-posts">
                    ${allItems.map(createCard)}
                    </div>
            `
            : html `
            <!-- Display an h1 if there are no posts -->
        <h1 class="title no-posts-title">No posts yet!</h1>
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


export async function homeView(ctx) {
    let allItems = await getAll()

    ctx.render(homeTemplate(allItems))
}