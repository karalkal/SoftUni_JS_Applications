import { html } from "../../node_modules/lit-html/lit-html.js";
import { getSingleById, updatePost } from "../api/data.js";


const updateTemplate = (submitData, itemData) => {
    // console.log(itemData)
    return html`
    <section id="edit-page" class="auth">
        <form @submit=${submitData} id="edit">
            <h1 class="title">Edit Post</h1>
    
            <article class="input-group">
                <label for="title">Post Title</label>
                <input type="title" name="title" id="title" .value=${itemData.title}>
            </article>
    
            <article class="input-group">
                <label for="description">Description of the needs </label>
                <input type="text" name="description" id="description" .value=${itemData.description}>
            </article>
    
            <article class="input-group">
                <label for="imageUrl"> Needed materials image </label>
                <input type="text" name="imageUrl" id="imageUrl" .value=${itemData.imageUrl}>
            </article>
    
            <article class="input-group">
                <label for="address">Address of the orphanage</label>
                <input type="text" name="address" id="address" .value=${itemData.address}>
            </article>
    
            <article class="input-group">
                <label for="phone">Phone number of orphanage employee</label>
                <input type="text" name="phone" id="phone" .value=${itemData.phone}>
            </article>
    
            <input type="submit" class="btn submit" value="Edit Post">
        </form>
    </section>
    `
}

export async function updateView(ctx) {
    let itemId = ctx.params.id
    let itemData = await getSingleById(itemId)

    ctx.render(updateTemplate(submitData, itemData))
    // form fields get data from itemData, then populate form fields, then upon submit envoke func below

    async function submitData(event) {
        event.preventDefault()

        let formData = new FormData(event.target)
        let title = formData.get('title').trim()
        let description = formData.get('description').trim()
        let imageUrl = formData.get('imageUrl').trim()
        let address = formData.get('address').trim()
        let phone = formData.get('phone').trim()

        if (title == "" || description == "" || imageUrl == "" || address == '' || phone == '') {
            return alert('Please fill all requred fields')
        }

        await updatePost(itemId, {
            title,
            description,
            imageUrl,
            address,
            phone
        });     // expects object


        ctx.page.redirect(`/details/${itemId}`)      //ctx has page object attached to it
    }

}


