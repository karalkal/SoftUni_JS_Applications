import { html } from "../../node_modules/lit-html/lit-html.js";
import { getTheatreById, updateTheatre } from "../api/data.js";


const updateTemplate = (submitData, itemData) => {
    // console.log(itemData)
    return html`
    <section id="editPage">
        <form @submit=${submitData} class="theater-form">
            <h1>Edit Theater</h1>
            <div>
                <label for="title">Title:</label>
                <input id="title" name="title" type="text" placeholder="Theater name" .value=${itemData.title}>
            </div>
            <div>
                <label for="date">Date:</label>
                <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${itemData.date}>
            </div>
            <div>
                <label for="author">Author:</label>
                <input id="author" name="author" type="text" placeholder="Author" .value=${itemData.author}>
            </div>
            <div>
                <label for="description">Theater Description:</label>
                <textarea id="description" name="description" placeholder="Description"
                    .value=${itemData.description}></textarea>
            </div>
            <div>
                <label for="imageUrl">Image url:</label>
                <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" .value=${itemData.imageUrl}>
            </div>
            <button class="btn" type="submit">Submit</button>
        </form>
    </section>
    `
}

export async function updateView(ctx) {
    let itemId = ctx.params.id
    let itemData = await getTheatreById(itemId)

    ctx.render(updateTemplate(submitData, itemData))
    // form fields get data from itemData, then populate form fields, then upon submit envoke func below

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

        await updateTheatre(itemId, {
            title,
            date,
            author,
            description,
            imageUrl
        });     // expects object


        ctx.page.redirect(`/details/${itemId}`)      //ctx has page object attached to it
    }

}


