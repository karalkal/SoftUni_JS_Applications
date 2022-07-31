import { html } from "../../node_modules/lit-html/lit-html.js";
import { editMeme, getMemeById } from "../api/data.js";


const updateTemplate = (submitData, itemData) => html`
    <section id="edit-meme">
        <form @submit=${submitData} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder=${itemData.title} name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">
                    ${itemData.description}
                </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder=${itemData.imageUrl} name="imageUrl">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
    `

export async function viewUpdate(ctx) {
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
            alert('Please fill all requred fields')
            throw new Error('Please fill all requred fields')
        }

        // expects ID of item to edit and OBJECT
        await editMeme(itemId,
            {
                title,
                description,
                imageUrl,
            });

        ctx.page.redirect(`/details/${itemId}`)      //ctx has page object attached to it
    }
}


