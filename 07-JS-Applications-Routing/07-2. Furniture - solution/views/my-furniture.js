import { html, render } from '../node_modules/lit-html/lit-html.js';

const container = document.querySelector('div.container')

export async function showMyItems() {
    let myItems = await getMyItems(localStorage.ownerId)
    // console.log(localStorage.ownerId)
    // console.log(myItems)
    render(myItemsTemplate(myItems), container)
}

const myItemsTemplate = (myItems) => html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
            ${myItems.map(item => html`
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
            `)}
        </div>
        `

async function getMyItems(userId) {
    try {
        const response = await fetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${userId}%22`)
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