import { html } from "../../node_modules/lit-html/lit-html.js";
import { createMeme } from "../api/data.js";
import { notify } from "../notify.js";


const createTemplate = (submitData) => html`
    <section id="create-meme">
        <form @submit=${submitData} id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>
    `


export function createView(ctx) {

    ctx.render(createTemplate(submitData))

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

        await createMeme({
            title,
            description,
            imageUrl,
        });     // expects object

        ctx.page.redirect('/catalog')  //ctx has page object attached to it
    }
}


