import { html } from "../../node_modules/lit-html/lit-html.js";
import { getGameById, updateGame } from "../api/data.js";


const updateTemplate = (submitData, itemData) => {
    // console.log(itemData)
    return html`
    <section id="edit-page" class="auth">
        <form @submit=${submitData} id="edit">
            <div class="container">
                <h1>Edit Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" .value=${itemData.title}>
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" .value=${itemData.category}>
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${itemData.maxLevel}>
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" .value=${itemData.imageUrl}>
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary" .value=${itemData.summary}></textarea>
                <input class="btn submit" type="submit" value="Edit Game">
            </div>
        </form>
    </section>
    `
}

export async function updateView(ctx) {
    let itemId = ctx.params.id
    let itemData = await getGameById(itemId)

    ctx.render(updateTemplate(submitData, itemData))
    // form fields get data from itemData, then populate form fields, then upon submit envoke func below

    async function submitData(event) {
        event.preventDefault()

        let formData = new FormData(event.target)
        let title = formData.get('title').trim()
        let category = formData.get('category').trim()
        let maxLevel = formData.get('maxLevel').trim()
        let imageUrl = formData.get('imageUrl').trim()
        let summary = formData.get('summary').trim()

        if (title == "" || category == "" || maxLevel == "" || imageUrl == "" || summary == "") {
            return alert('Please fill all requred fields')
        }

        // update expects ID of item to edit and OBJECT
        await updateGame(itemId, {
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        });     // expects object


        ctx.page.redirect(`/details/${itemId}`)      //ctx has page object attached to it
    }

}


