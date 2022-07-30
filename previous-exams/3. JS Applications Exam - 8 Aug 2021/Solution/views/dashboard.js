import { html, render } from '../node_modules/lit-html/lit-html.js'


const container = document.querySelector('main#site-content')

let allBooks = await getBooks()

export function viewDashboard(ctx) {
    render(homeTemplate(allBooks), container)
}

const homeTemplate = (allBooks) => html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>

        ${allBooks.length == 0

        ? html` <p class="no-books">No books in database!</p>
        `
        
        : html`
        <ul class="other-books-list">
            ${renderCards(allBooks)}
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


async function getBooks() {
    try {
        let response = await fetch(`http://localhost:3030/data/books?sortBy=_createdOn%20desc`)
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