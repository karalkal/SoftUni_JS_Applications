import { html, render } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"

const container = document.querySelector('div.container')

export async function deleteItem(ctx) {
    let itemID = ctx.params.itemID

    let del = confirm("Are you sure you want to delete this record?");
    if (del == false) {

    } else {
        let response = await fetch(`http://localhost:3030/data/catalog/${itemID}`, {
            method: 'delete',
            headers: { 'X-Authorization': localStorage.token },
        })
    }

    page.redirect(('/'))
}