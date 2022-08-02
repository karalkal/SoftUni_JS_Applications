import { html } from "../../node_modules/lit-html/lit-html.js";
import { getalbumById, updateAlbum } from "../api/data.js";


const updateTemplate = (submitData, itemData) => html`
    <section class="editPage">
        <form @submit=${submitData}>
            <fieldset>
                <legend>Edit Album</legend>
    
                <div class="container">
                    <label for="name" class="vhide">Album name</label>
                    <input id="name" name="name" class="name" type="text" .value=${itemData.name}>
    
                    <label for="imgUrl" class="vhide">Image Url</label>
                    <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value=${itemData.imgUrl}>
    
                    <label for="price" class="vhide">Price</label>
                    <input id="price" name="price" class="price" type="text" .value=${itemData.price}>
    
                    <label for="releaseDate" class="vhide">Release date</label>
                    <input id="releaseDate" name="releaseDate" class="releaseDate" type="text"
                        .value=${itemData.releaseDate}>
    
                    <label for="artist" class="vhide">Artist</label>
                    <input id="artist" name="artist" class="artist" type="text" .value=${itemData.artist}>
    
                    <label for="genre" class="vhide">Genre</label>
                    <input id="genre" name="genre" class="genre" type="text" .value=${itemData.genre}>
    
                    <label for="description" class="vhide">Description</label>
                    <textarea name="description" class="description" rows="10" cols="10"
                        .value=${itemData.description}></textarea>
    
                    <button class="edit-album" type="submit">Edit Album</button>
                </div>
            </fieldset>
        </form>
    </section>
    `

export async function updateView(ctx) {
    let itemId = ctx.params.id
    let itemData = await getalbumById(itemId)

    ctx.render(updateTemplate(submitData, itemData))
    // form fields get data from itemData, then upon submit envoke func below

    async function submitData(event) {
        event.preventDefault()

        let formData = new FormData(event.target)
        let name = formData.get('name')
        let imgUrl = formData.get('imgUrl')
        let price = formData.get('price')
        let releaseDate = formData.get('releaseDate')
        let artist = formData.get('artist')
        let genre = formData.get('genre')
        let description = formData.get('description')

        if (name == "" || imgUrl == "" || price == "" || releaseDate == "" ||
            artist == "" || genre == "" || description == "") {
            return alert('Please fill all requred fields')
        }

        // update expects ID of item to edit and OBJECT
        await updateAlbum(itemId, {
            name,
            imgUrl,
            price,
            releaseDate,
            artist,
            genre,
            description
        });     // expects object

        
        ctx.page.redirect(`/details/${itemId}`)      //ctx has page object attached to it
    }
}


