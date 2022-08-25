import { html } from "../../node_modules/lit-html/lit-html.js";
import { createOffer } from "../api/data.js";


const createTemplate = (submitData) => html`
    <section id="create">
        <div class="form">
            <h2>Create Offer</h2>
            <form @submit=${submitData} class="create-form">
                <input type="text" name="title" id="job-title" placeholder="Title" />
                <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
                <input type="text" name="category" id="job-category" placeholder="Category" />
                <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
                <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                    cols="50"></textarea>
                <input type="text" name="salary" id="job-salary" placeholder="Salary" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>
    `

export function createView(ctx) {

    ctx.render(createTemplate(submitData))

    async function submitData(event) {
        event.preventDefault()

        let formData = new FormData(event.target)
        let title = formData.get('title').trim()
        let imageUrl = formData.get('imageUrl').trim()
        let category = formData.get('category').trim()
        let description = formData.get('description').trim()
        let requirements = formData.get('requirements').trim()
        let salary = formData.get('salary').trim()

        if (title == "" || imageUrl == "" || category == "" || description == "" || requirements == "" || salary == '') {
            return alert('Please fill all requred fields')
        }

        await createOffer({
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        });     // expects object

        ctx.page.redirect('/catalog')  //ctx has page object attached to it
    }
}


