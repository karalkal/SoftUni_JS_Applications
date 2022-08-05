import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'


const container = document.querySelector('main#site-content')

let book

export async function viewDetails(ctx) {

    book = await getSingleBook(ctx.params.id)
    render(detailsTemplate(book), container)
}

const detailsTemplate = (book) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">

        ${book._ownerId === localStorage.getItem('userID')
            ? html`
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a class="button" href="/delete/${book._id}">Delete</a>`
            : nothing
        }

        ${localStorage.length > 0 && book._ownerId !== localStorage.getItem('userID')
            ? html`
            <a class="button" href="#">Like</a>`
            : nothing
        }

            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>

`


async function getSingleBook(id) {
    try {
        let response = await fetch(`http://localhost:3030/data/books/${id}`)
        if (response.ok == false) {
            let err = response.json()
            throw new Error(err.message)
        }

        let book = await response.json()
        return book

    } catch (error) {
        throw new Error(error.message)
    }
}