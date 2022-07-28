import { html, render } from '../node_modules/lit-html/lit-html.js';


const container = document.querySelector('div.container')

export async function showDetails(ctx) {
    let item = await getItemDetails(ctx.params.itemID)
    render(detailsTemplate(item), container)
}

const detailsTemplate = (item) => {
    
    let isOwner = item._ownerId == localStorage.ownerId

    return html`
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src="${item.img}" />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${item.make}</span></p>
                <p>Model: <span>${item.model}</span></p>
                <p>Year: <span>${item.year}</span></p>
                <p>Description: <span>${item.description}</span></p>
                <p>Price: <span>${item.price}</span></p>
                <p>Material: <span>${item.material}</span></p>
                ${isOwner 
                ? html `
                <div>
                    <a href="/update/${item._id}" class="btn btn-info">Edit</a>
                    <a href="/delete/${item._id}" class="btn btn-red">Delete</a>
                </div>`
                : null
                }
            </div>
        </div>
`
}


async function getItemDetails(id) {
    try {
        const response = await fetch(`http://localhost:3030/data/catalog/${id}`)
        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let item = await response.json()
        return item
    }

    catch (err) {
        alert(err.message)
        throw new Error(err.message)
    }
}