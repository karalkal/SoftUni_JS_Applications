import { html, nothing } from "../../node_modules/lit-html/lit-html.js"

import { searchAlbumByName } from "../api/data.js"
import { getUserData } from "../util.js";


let loggedInUser = null                // just declare it, if value is assigned, will display details button

const searchTemplate = (searchDB, foundAlbums, searchCompleted) => html`
        <section id="search-cars">
            <h1>Filter by year</h1>
        
            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button class="button-list">Search</button>
            </div>
        
            <h2>Results:</h2>
            <div class="listings">
        
                <!-- Display all records -->
                <div class="listing">
                    <div class="preview">
                        <img src="/images/audia3.jpg">
                    </div>
                    <h2>Audi A3</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: 2018</h3>
                            <h3>Price: 25000 $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="#" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>
        
                <!-- Display if there are no matches -->
                <p class="no-cars"> No results.</p>
            </div>
        </section>
        `




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
        ? html`
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
            alert('Search field cannot be left blank')
            return
        }
        console.log(searchTerm, ctx)

        searchCompleted = true
        foundAlbums = await searchAlbumByName(searchTerm)
        console.log(foundAlbums)

        ctx.render(searchTemplate(searchDB, foundAlbums, searchCompleted));
    }

}