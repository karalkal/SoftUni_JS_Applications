import { html } from "../../node_modules/lit-html/lit-html.js";
import { getPetById, updatePet } from "../api/data.js";


const updateTemplate = (submitData, itemData) => {
    // console.log(itemData)
    return html`
    <section id="editPage">
        <form @submit=${submitData} class="editForm">
            <img src=${itemData.image}>
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" .value=${itemData.name}>
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" .value=${itemData.breed}>
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" value="${itemData.age}">
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" .value=${itemData.weight}>
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" .value=${itemData.image}>
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>
    `
}

export async function updateView(ctx) {
    let itemId = ctx.params.id
    let itemData = await getPetById(itemId)

    ctx.render(updateTemplate(submitData, itemData))
    // form fields get data from itemData, then populate form fields, then upon submit envoke func below

    async function submitData(event) {
        event.preventDefault()

        let formData = new FormData(event.target)
        let name = formData.get('name').trim()
        let breed = formData.get('breed').trim()
        let age = formData.get('age').trim()
        let weight = formData.get('weight').trim()
        let image = formData.get('image').trim()

        if (name == "" || breed == "" || age == "" || weight == "" || image == "") {
            return alert('Please fill all requred fields')
        }

        await updatePet(itemId, {
            name,
            breed,
            age,
            weight,
            image
        });     // expects object


        ctx.page.redirect(`/details/${itemId}`)      //ctx has page object attached to it
    }

}


