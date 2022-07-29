import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs'


const container = document.querySelector('main#main-content')

export function viewCreate() {
    render(createTemplate(), container)
}


const createTemplate = () => html`
<section id="create-page" class="auth">
    <form id="create" @submit=${submitData}>
        <h1 class="title">Create Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone">
        </article>

        <input type="submit" class="btn submit" value="Create Post">
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
    let address = formData.get("address")
    let phone = formData.get("phone")

    try {
        if (formData == '' || title == '' || description == '' || imageUrl == '' || address == '' || phone == '') {
            alert('All fieldas are required')
            throw new Error('All fieldas are required')
        }

        let response = await fetch(`http://localhost:3030/data/posts`, {
            method: 'post',
            headers: {
                'X-Authorization': localStorage.token,
                "Content-Type": "application / json"
            },
            body: JSON.stringify({ title, description, imageUrl, address, phone })
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