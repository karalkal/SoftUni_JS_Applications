import { html } from "../../node_modules/lit-html/lit-html.js";
import { createGame } from "../api/data.js";


const createTemplate = (submitData) => html`
    <section id="create-page" class="auth">
        <form @submit=${submitData} id="create">
            <div class="container">
    
                <h1>Create Game</h1>
                <label for="leg-title">Legendary title:</label>
                <input type="text" id="title" name="title" placeholder="Enter game title...">
    
                <label for="category">Category:</label>
                <input type="text" id="category" name="category" placeholder="Enter game category...">
    
                <label for="levels">MaxLevel:</label>
                <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">
    
                <label for="game-img">Image:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">
    
                <label for="summary">Summary:</label>
                <textarea name="summary" id="summary"></textarea>
                <input class="btn submit" type="submit" value="Create Game">
            </div>
        </form>
    </section>
    `


export function createView(ctx) {

    ctx.render(createTemplate(submitData))

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

        await createGame({
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        });     // expects object

        ctx.page.redirect('/catalog')  //ctx has page object attached to it
    }
}


