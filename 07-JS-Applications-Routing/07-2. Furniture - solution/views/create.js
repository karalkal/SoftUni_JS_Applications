import page from "../node_modules/page/page.mjs"
import { html, render } from "../node_modules/lit-html/lit-html.js"


const container = document.querySelector('div.container')
let invalidFields = []      // will try to add invalid fields as string to array so that proper class can be applied in form if user has to re-enter
let originalLoad = true     // need to chech if this is first load of form, if yes - no valid/invalid classes

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
                <input class="form-control valid ${applyClass('make', invalidFields)}" id="new-make" type="text"
                    name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${applyClass('model', invalidFields)}" id="new-model" type="text"
                    name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${applyClass('year', invalidFields)}" id="new-year" type="number"
                    name="year">
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
                <input class="form-control ${applyClass('price', invalidFields)}" id="new-price" type="number"
                    name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${applyClass('img', invalidFields)}" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control ${applyClass('material', invalidFields)}" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>
`

export function createItem() {
    render(createTemplate(), container)
}

async function onSubmit(event) {
    event.preventDefault()
    let formData = new FormData(event.target)
    let { make, model, year, description, price, img, material } = Object.fromEntries(formData)
    // document.querySelector('form').reset()  // don't reset in case user has errors

    originalLoad = false
    invalidFields = []      // need to reser the array and validate entries again

    // if an entry is not valid, add its name to array, then based on name will apply the class
    if (!img) invalidFields.push('img')                        // the rest will be checked below anyway
    if (make.length < 4) invalidFields.push('make')
    if (model.length < 4) invalidFields.push('model')
    if (Number(year) < 1950 || Number(year) > 2050) invalidFields.push('year')
    if (description.length < 10) invalidFields.push('description')
    if (Number(price) <= 0) invalidFields.push('price')

    if (invalidFields.length > 0) {
        console.log('invalid')
        createItem()
        return
    }

    try {
        let response = await fetch(`http://localhost:3030/data/catalog`, {
            method: 'post',
            headers: { 'X-Authorization': localStorage.token },
            body: JSON.stringify({ make, model, year: Number(year), description, price: Number(price), img, material })
        })

        if (response.ok == false) {
            let error = await response.json()
            throw new Error(error.message)
        }
        let data = await response.json();

        page.redirect('/catalog')

    } catch (error) {
        alert(error.message)
        throw new Error(error.message)
    }
}

function applyClass(currentField, invalidFields) {
    if (originalLoad == true) {         //if form loads for a first time, will set to false after data is filled and submitted
        return
    }

    if (invalidFields.includes(currentField)) {
        console.log(currentField + ' is invalid')
        return 'is-invalid'
    }
    currentField + ' is OK'
    return 'is-valid'
}