import { html } from "../../node_modules/lit-html/lit-html.js";
import { createBook } from "../api/data.js";


const createTemplate = (submitData) => html`
    <section id="create-page" class="create">
        <form @submit=${submitData}id="create-form" action="" method="">
            <fieldset>
                <legend>Add new Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" placeholder="Title">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description" placeholder="Description"></textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" placeholder="Image">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type">
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Add Book">
            </fieldset>
        </form>
    </section>
    `

export function viewCreate(ctx) {

    ctx.render(createTemplate(submitData))

    async function submitData(event) {
        event.preventDefault()

        let formData = new FormData(event.target)
        let title = formData.get('title')
        let description = formData.get('description')
        let imageUrl = formData.get('imageUrl')
        let type = formData.get('type')

        if (title == '' || description == '' || imageUrl == '' || type == '') {
            return alert('Please fill all requred fields')
        }

        await createBook({
            title,
            description,
            imageUrl,
            type
        });     // expects object

        ctx.page.redirect('/')      //ctx has page object attached to it
    }
}


