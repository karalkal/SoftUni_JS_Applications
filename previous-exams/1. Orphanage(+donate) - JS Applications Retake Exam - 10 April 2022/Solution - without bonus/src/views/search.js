import { html, nothing } from "../../node_modules/lit-html/lit-html.js"

import { searchAlbumByName } from "../api/data.js"
import { getUserData } from "../util.js";


let loggedInUser = null                // just declare it, if value is assigned, will display details button

const searchTemplate = (searchDB, foundAlbums, searchCompleted) => html`
        <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click = ${searchDB} class="button-list">Search</button>
            </div>

            ${!searchCompleted 
            ? nothing
            : html `
            <h2>Results:</h2>
            <!--Show after click Search button-->

            <div class="search-result">

            ${foundAlbums.length > 0
                    ? html`
                    ${foundAlbums.map(createCard)}
                    `
                    : html`
                <p class="no-result">No result.</p>
        `}

            </div>
        </section>
        `
        }`

    

const createCard = (item) => html`
    <div class="card-box">
    <img src="${item.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${item.name}</p>
                <p class="artist">Artist: ${item.artist}</p>
                <p class="genre">Genre: ${item.genre}</p>
                <p class="price">Price: $${item.price}</p>
                <p class="date">Release Date: ${item.releaseDate}</p>
            </div>

            ${loggedInUser
            ? html `
            <div class="btn-group">
                <a href="/details/${item._id}" id="details">Details</a>
            </div>
            `
            : nothing
            }
        </div>
    </div>
    `


export async function searchView(ctx) {
    loggedInUser = getUserData()  // set value to it if data in localStorage, need it for cards buttons

    let searchCompleted = false
    let foundAlbums = []

    ctx.render(searchTemplate(searchDB, foundAlbums, searchCompleted))

    async function searchDB() {
        let searchTerm = document.querySelector('div.search input').value.trim()

        if (!searchTerm) {  
            alert ('Search field cannot be left blank')
            return
        }
        console.log(searchTerm, ctx)

        searchCompleted = true
        foundAlbums = await searchAlbumByName(searchTerm)
        console.log(foundAlbums)

        ctx.render(searchTemplate(searchDB, foundAlbums, searchCompleted));
    }
    
}