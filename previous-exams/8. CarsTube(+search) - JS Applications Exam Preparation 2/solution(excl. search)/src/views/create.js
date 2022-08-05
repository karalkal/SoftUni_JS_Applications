import { html } from "../../node_modules/lit-html/lit-html.js";
import { createCar } from "../api/data.js";


const createTemplate = (submitData) => html`
    <section id="create-listing">
        <div class="container">
            <form @submit=${submitData} id="create-form">
                <h1>Create Car Listing</h1>
                <p>Please fill in this form to create an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand">
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model">
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description">
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year">
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl">
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price">
    
                <hr>
                <input type="submit" class="registerbtn" value="Create Listing">
            </form>
        </div>
    </section>
    `

export function createView(ctx) {

    ctx.render(createTemplate(submitData))

    async function submitData(event) {
        event.preventDefault()

        let formData = new FormData(event.target)
        let brand = formData.get('brand').trim()
        let model = formData.get('model').trim()
        let description = formData.get('description').trim()
        let year = formData.get('year').trim()
        let imageUrl = formData.get('imageUrl').trim()
        let price = formData.get('price').trim()

        if (brand == "" || model == "" || description == "" || year == "" || imageUrl == "" || price == "") {
            return alert('Please fill all requred fields')
        }

        if (Number(price) <= 0 || Number(year) <= 0) {
            return alert('Numbers must be positive')
        }

        await createCar({
            brand,
            model,
            description,
            year: Number(year),
            imageUrl,
            price: Number(price)
        });     // expects object

        ctx.page.redirect('/catalog')  //ctx has page object attached to it
    }
}


