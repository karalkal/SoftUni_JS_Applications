import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs'


const container = document.querySelector('main#site-content')

export function viewCreate() {
    render(createTemplate(), container)
}


const createTemplate = () => html`
    <section id="create-page" class="create">
        <form id="create-form" action="" method="" @submit=${submitData}>
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
            alert('All fields are required')
            throw new Error('All fieldas are required')
        }

        let response = await fetch(`http://localhost:3030/data/books`, {
            method: 'post',
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