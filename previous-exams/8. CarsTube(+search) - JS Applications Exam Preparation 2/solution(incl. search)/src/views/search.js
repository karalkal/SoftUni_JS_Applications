import { html, nothing } from "../../node_modules/lit-html/lit-html.js"

import { searchCar } from "../api/data.js"
import { getUserData } from "../util.js";


let loggedInUser = null                // just declare it, if value is assigned, will display details button

const searchTemplate = (searchDB, foundCars, searchCompleted) => html`
        <section id="search-cars">
            <h1>Filter by year</h1>
        
            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button @click=${searchDB} class="button-list">Search</button>
            </div>
        
            <h2>Results:</h2>
            <div class="listings">
        
                ${foundCars.length > 0
                ? foundCars.map(createCard)
                : html` <p class="no-cars"> No results.</p> `
            }
            </div>
        </section>
        `



const createCard = (car) => html`
    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
    `


export async function searchView(ctx) {
    // loggedInUser = getUserData()  // set value to it if data in localStorage, need it for cards buttons

    let searchCompleted = false
    let foundCars = []

    ctx.render(searchTemplate(searchDB, foundCars, searchCompleted))

    async function searchDB() {
        let searchTerm = Number(document.querySelector('input#search-input').value.trim())

        if (!searchTerm) {
            alert('Search field cannot be left blank')
            return
        }


        if (!Number.isInteger(searchTerm)) {
            alert('Year must be an integer')
            return
        }

        searchCompleted = true
        foundCars = await searchCar(searchTerm)
        // console.log(foundCars)

        ctx.render(searchTemplate(searchDB, foundCars, searchCompleted));
    }

}