import { html } from "../../node_modules/lit-html/lit-html.js";
import { editBook, getBookById } from "../api/data.js";


const updateTemplate = (submitData, itemData) => html`
    <section id="edit-page" class="edit">
        <form @submit=${submitData} id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" value=${itemData.title}>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description">${itemData.description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" value=${itemData.imageUrl}>
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" value=${itemData.type}>
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>
    `


export async function viewUpdate(ctx) {
    let itemId = ctx.params.id
    let itemData = await getBookById(itemId)

    ctx.render(updateTemplate(submitData, itemData))

    async function submitData(event) {
        event.preventDefault()

        let formData = new FormData(event.target)
        let title = formData.get('title')
        let description = formData.get('description')
        let imageUrl = formData.get('imageUrl')
        let type = formData.get('type')

        if (title == '' || description == '' || imageUrl == '' || type == '') {
            alert('Please fill all requred fields')
            throw new Error('Please fill all requred fields')
        }

        // expects ID of item to edit and OBJECT
        await editBook(itemId,
            {
                title,
                description,
                imageUrl,
                type
            });

        ctx.page.redirect('/')      //ctx has page object attached to it
    }
}


