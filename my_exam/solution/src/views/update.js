import { html } from "../../node_modules/lit-html/lit-html.js";
import { getOfferById, updateOffer } from "../api/data.js";


const updateTemplate = (submitData, itemData) => {
    // console.log(itemData)
    return html`
    <section @submit=${submitData} id="edit">
        <div class="form">
            <h2>Edit Offer</h2>
            <form class="edit-form">
                <input .value=${itemData.title} type="text" name="title" id="job-title" placeholder="Title" />
                <input .value=${itemData.imageUrl} type="text" name="imageUrl" id="job-logo"
                    placeholder="Company logo url" />
                <input .value=${itemData.category} type="text" name="category" id="job-category" placeholder="Category" />
                <textarea .value=${itemData.description} id="job-description" name="description" placeholder="Description"
                    rows="4" cols="50"></textarea>
                <textarea .value=${itemData.requirements} id="job-requirements" name="requirements"
                    placeholder="Requirements" rows="4" cols="50"></textarea>
                <input .value=${itemData.salary} type="text" name="salary" id="job-salary" placeholder="Salary" />
    
                <button type="submit">post</button>
            </form>
        </div>
    </section>

    `
}

export async function updateView(ctx) {
    let itemId = ctx.params.id
    let itemData = await getOfferById(itemId)

    ctx.render(updateTemplate(submitData, itemData))
    // form fields get data from itemData, then populate form fields, then upon submit envoke func below

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

        await updateOffer(itemId, {
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        });     // expects object


        ctx.page.redirect(`/details/${itemId}`)      //ctx has page object attached to it
    }

}


