import { html } from "../../node_modules/lit-html/lit-html.js";
import { updateMeme as updateMeme, getMemeById } from "../api/data.js";
import { notify } from "../notify.js";


const updateTemplate = (submitData, itemData) => html`
    <section id="edit-meme">
        <form @submit=${submitData} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input .value=${itemData.title} id="title" type="text" name="title">
                <label for="description">Description</label>
                <textarea .value=${itemData.description} id="description" placeholder="Enter Description"
                    name="description"> </textarea>
                <label for="imageUrl">Image Url</label>
                <input .value=${itemData.imageUrl} id="imageUrl" type="text" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
    `

export async function updateView(ctx) {
    let itemId = ctx.params.id
    let itemData = await getMemeById(itemId)

    // console.log(itemData, itemId)

    ctx.render(updateTemplate(submitData, itemData))

    // form fields get data from itemData, then upon submit envoke func below
    async function submitData(event) {
        event.preventDefault()

        let formData = new FormData(event.target)
        let title = formData.get('title')
        let description = formData.get('description')
        let imageUrl = formData.get('imageUrl')

        if (title == '' || description == '' || imageUrl == '') {
            // return alert('Please fill all requred fields')
            return notify('Please fill all requred fields')
        }

        // expects ID of item to edit and OBJECT
        await updateMeme(itemId,
            {
                title,
                description,
                imageUrl,
            });

        ctx.page.redirect(`/details/${itemId}`)      //ctx has page object attached to it
    }
}


