import { html } from "../../node_modules/lit-html/lit-html.js";
import { createTheatre } from "../api/data.js";


const createTemplate = (submitData) => html`
    <section id="createPage">
        <form @submit=${submitData} class="create-form">
            <h1>Create Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" value="">
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year">
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author">
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" name="description" placeholder="Description"></textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>
    `

export function createView(ctx) {

    ctx.render(createTemplate(submitData))

    async function submitData(event) {
        event.preventDefault()

        let formData = new FormData(event.target)
        let title = formData.get('title').trim()
        let date = formData.get('date').trim()
        let author = formData.get('author').trim()
        let description = formData.get('description').trim()
        let imageUrl = formData.get('imageUrl').trim()

        if (title == "" || date == "" || author == "" || description == "" || imageUrl == "") {
            return alert('Please fill all requred fields')
        }

        await createTheatre({
            title,
            date,
            author,
            description,
            imageUrl
        });     // expects object

        ctx.page.redirect('/')  //ctx has page object attached to it
    }
}


