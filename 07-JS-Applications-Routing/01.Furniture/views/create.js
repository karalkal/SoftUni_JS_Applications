import page from "../node_modules/page/page.mjs"
import { html, render } from "../node_modules/lit-html/lit-html.js"
// import { displayMenuItems } from "../app.js"


const container = document.querySelector('div.container')
let invalidFields = []      // will try to add invalid fields as string to array so that proper class can be applied in form if user has to re-enter

export function createItem() {
    render(createTemplate(), container)
}

const createTemplate = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control valid" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${applyClass('description', invalidFields)}" id="new-description" type="text"
                    name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
`

async function onSubmit(event) {
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

        invalidFields = []  // need to reset array at each form submission
        /*
        Make and Model must be at least 4 symbols long
        Year must be between 1950 and 2050
        Description must be more than 10 symbols
        Price must be a positive number
        Image URL is required
        Material is optional
        */

        if (!img) invalidFields.push('make')   // the rest will be checked below anyway
        if (make.length < 4) invalidFields.push('make')
        if (model.length < 4) invalidFields.push('model')
        if (year < 1950 || year > 2050) invalidFields.push('year')
        if (description.length < 10) invalidFields.push('description')
        if (price <= 0) invalidFields.push('price')

        // console.log(invalidFields)

        if (invalidFields.length > 0) throw new Error('Invalid data.')

        let response = await fetch(`http://localhost:3030/data/catalog`, {
            method: 'post',
            headers: { 'X-Authorization': localStorage.token },
            body: JSON.stringify({ make, model, year, description, price, img, material })
        })

        if (response.ok == false) {
            let error = await response.json()
            throw new Error(error.message)
        }
        let data = await response.json();
        // console.log(data)

        page.redirect('/')

    } catch (error) {
        alert(error.message)
        throw new Error(error.message)
    }
}

function applyClass(currentField, invalidFields) {
    console.log('here')
    // console.log(invalidFields, currentField)
    // console.log(invalidFields.includes(currentField))
    if (invalidFields.includes(currentField)) {
        return 'is-invalid'
    }
    return 'is-valid'
}