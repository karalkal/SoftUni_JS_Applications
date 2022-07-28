import { html, render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"
// import { displayMenuItems } from "../app.js"

const container = document.querySelector('div.container')

let itemID

export async function updateItem(ctx) {
    itemID = ctx.params.itemID
    let item = await (getItemData(itemID))
    render(editTemplate(item), container)
}

const editTemplate = (item) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" value=${item.make}>
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control is-valid" id="new-model" type="text" name="model" value=${item.model}>
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control is-invalid" id="new-year" type="number" name="year" value=${item.year}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description"
                        value=${item.description}>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" value=${item.price}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" value=${item.img}>
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material" value=${item.material}>
                </div>
                <input type="submit" class="btn btn-info" value="Edit" />
            </div>
        </div>
    </form>
    `

async function getItemData(itemID) {
    let response = await fetch(`http://localhost:3030/data/catalog/${itemID}`)
    let data = await response.json()
    return data
}

async function onSubmit(event, it) {
    event.preventDefault()

    let formData = new FormData(event.target)
    let make = formData.get('make').trim()
    let model = formData.get('model').trim()
    let year = Number(formData.get('year').trim())
    let description = formData.get('description').trim()
    let price = Number(formData.get('price').trim())
    let img = formData.get('img').trim()
    let material = formData.get('material').trim()

    document.querySelector('form').reset()

    try {
        let response = await fetch(`http://localhost:3030/data/catalog/${itemID}`, {
            method: 'put',
            headers: { 'X-Authorization': localStorage.token },
            body: JSON.stringify({ make, model, year, description, price, img, material })
        })
        if (response.ok == false) {
            let error = response.json();
            throw new Error(error.message)
        }

        let updated = await response.json()

        alert('Edited ' + updated.make + ' - ' + updated.model) 

        page.redirect('/my-furniture')

    } catch (error) {
        throw new Error(error.message)
    }
}