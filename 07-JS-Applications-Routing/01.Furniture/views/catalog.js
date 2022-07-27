import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';

const container = document.querySelector('div.container')

let allItems = await getAllItems()

export function showCatalog() {
    render(catalogTemplate(), container)
}

const catalogTemplate = () => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
    
        ${allItems.map(displayCards)}
    
    </div>
`

const displayCards = (item) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${item.img}" />
                <p>${item.description}</p>
                <footer>
                    <p>Price: <span>${item.price} $</span></p>
                </footer>
                <div>
                    <a href="/catalog/${item._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
`

async function getAllItems() {
    try {
        const response = await fetch('http://localhost:3030/data/catalog')
        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let allItems = await response.json()
        return allItems
    }

    catch (err) {
        alert(err.message)
        throw new Error(err.message)
    }
}