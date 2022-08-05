import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllBooks } from "../api/data.js";

const homeTemplate = (books) => html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        ${books.length > 0
        ? html ` <!-- Display ul: with list-items for All books (If any) -->
            <ul class="other-books-list">
                ${books.map(createCard)}
            </ul>                
                `
        : html ` <!-- Display paragraph: If there are no books in the database -->
                        <p class="no-books">No books in database!</p>
                `
        }
    </section>
    `

const createCard = (item) => html`
    <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>Type: ${item.type}</p>
        <p class="img"><img src=${item.imageUrl}></p>
        <a class="button" href="/details/${item._id}">Details</a>
    </li>
    `

export async function viewHome(ctx) {
    let allBooks = await getAllBooks()
    ctx.render(homeTemplate(allBooks))
}