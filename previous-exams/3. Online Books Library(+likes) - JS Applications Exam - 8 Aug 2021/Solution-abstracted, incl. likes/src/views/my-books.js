import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyBooks } from "../api/data.js";

const myBooksTemplate = (books) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        ${books.length > 0
        ? html `
        <!-- Display ul: with list-items for every user's books (if any) -->
        <ul class="my-books-list">
        ${books.map(createCard)}            
        </ul>
        `
        : html `
        <!-- Display paragraph: If the user doesn't have his own books  -->
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

export async function viewMyBooks(ctx) {
    
    let loggedInUserId;  // will remain undefined if nothing in localStorage

    if (localStorage.userData) {
        loggedInUserId = JSON.parse(localStorage.userData).id
    }

    let myBooks = await getMyBooks(loggedInUserId)
    ctx.render(myBooksTemplate(myBooks))
}