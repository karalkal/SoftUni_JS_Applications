import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCarById, updateCar } from "../api/data.js";


const updateTemplate = (submitData, itemData) => html`
    <section id="edit-listing">
        <div class="container">
    
            <form @submit=${submitData} id="edit-form">
                <h1>Edit Car Listing</h1>
                <p>Please fill in this form to edit an listing.</p>
                <hr>
    
                <p>Car Brand</p>
                <input type="text" placeholder="Enter Car Brand" name="brand" .value=${itemData.brand}>
    
                <p>Car Model</p>
                <input type="text" placeholder="Enter Car Model" name="model" .value=${itemData.model}>
    
                <p>Description</p>
                <input type="text" placeholder="Enter Description" name="description" .value=${itemData.description}>
    
                <p>Car Year</p>
                <input type="number" placeholder="Enter Car Year" name="year" .value=${itemData.year}>
    
                <p>Car Image</p>
                <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${itemData.imageUrl}>
    
                <p>Car Price</p>
                <input type="number" placeholder="Enter Car Price" name="price" .value=${itemData.price}>
    
                <hr>
                <input type="submit" class="registerbtn" value="Edit Listing">
            </form>
        </div>
    </section>
    `

export async function updateView(ctx) {
    let itemId = ctx.params.id
    let itemData = await getCarById(itemId)

    ctx.render(updateTemplate(submitData, itemData))
    // form fields get data from itemData, then populate form fields, then upon submit envoke func below

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

        await updateCar(itemId, {
            brand,
            model,
            description,
            year: Number(year),
            imageUrl,
            price: Number(price)
        });     // expects object


        ctx.page.redirect(`/details/${itemId}`)      //ctx has page object attached to it
    }

}


