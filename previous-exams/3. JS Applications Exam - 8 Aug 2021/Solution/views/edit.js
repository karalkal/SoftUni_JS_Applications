import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs'


const container = document.querySelector('main#site-content')

let itemId  // ugly but it works - need to declare it in global scope to allowa access in put request

export async function viewEdit(ctx) {
    itemId = ctx.params.id
    let item = await getItemData(itemId)

    render(editTemplate(item), container)
}


const editTemplate = (item) => html`
    <section id="edit-page" class="edit">
        <form id="edit-form" action="#" method="" @submit=${submitData}>
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" value=${item.title}>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description"
                            id="description">${item.description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" value=${item.imageUrl}>
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" value=${item.type}>
                            <option value="Fiction" selected>${item.type}</option>
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

async function submitData(event) {
    event.preventDefault()
    //Check if all the fields are filled

    let formData = new FormData(event.target)
    let title = formData.get("title")
    let description = formData.get("description")
    let imageUrl = formData.get("imageUrl")
    let type = formData.get("type")

    try {
        if (formData == '' || title == '' || description == '' || imageUrl == '' || type == '') {
            alert('All fieldas are required')
            throw new Error('All fields are required')
        }

        let response = await fetch(`http://localhost:3030/data/books/${itemId}`, {
            method: 'put',
            headers: {
                'X-Authorization': localStorage.token,
                "Content-Type": "application / json"
            },
            body: JSON.stringify({ title, description, imageUrl, type, })
        })

        if (response.ok == false) {
            let err = await response.json()
            throw new Error(err.mesage)
        }

        let newItem = await response.json()

        page.redirect('/')
    }
    catch (error) {
        throw new Error(error.mesage)
    }
}


async function getItemData(itemId) {
    try {
        let response = await fetch(`http://localhost:3030/data/books/${itemId}`)

        if (response.ok == false) {
            let err = response.json()
            throw new Error(err.message)
        }

        let item = await response.json()

        return item

    } catch (error) {
        throw new Error(error.message)
    }
}