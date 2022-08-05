import { html, render } from '../node_modules/lit-html/lit-html.js'


const container = document.querySelector('main#site-content')
let userId = localStorage.getItem('userID')

export async function viewOwnCollection(ctx) {

    let myBooks = await getMyBooks(userId)

    render(myBooksTemplate(myBooks), container)
}

const myBooksTemplate = (myBooks) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
    
        ${myBooks.length == 0

        ? html` <p class="no-books">No books in database!</p>
        `
    
        : html`
        <ul class="my-books-list">
            ${renderCards(myBooks)}
        </ul>
        `
        }
    </section>
    `

function renderCards(allBooks) {
    return allBooks.map(b => html`
    <li class="otherBooks">
        <h3>${b.title}</h3>
        <p>Type: ${b.type}</p>
        <p class="img"><img src="${b.imageUrl}"></p>
        <a class="button" href="/details/${b._id}">Details</a>
    </li>
    `)
}


async function getMyBooks(userId) {
    try {
        let response = await fetch(`http://localhost:3030/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
        if (response.ok == false) {
            let err = response.json()
            throw new Error(err.message)
        }

        let allItems = await response.json()

        return allItems
        // return []        // test if server returns empty json

    } catch (error) {
        throw new Error(error.message)
    }
}