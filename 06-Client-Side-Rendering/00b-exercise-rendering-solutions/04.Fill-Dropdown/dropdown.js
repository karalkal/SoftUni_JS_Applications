import { html, render } from "./node_modules/lit-html/lit-html.js"


const menu = document.getElementById('menu')
const form = document.querySelector('form')
form.addEventListener('submit', addItem)
renderOptions()

async function renderOptions() {
    let allItems = await getItems()
    render(Object.values(allItems).map(item => html`<option value=${item._id}>${item.text}</option>`), menu)
}


async function addItem(e) {
    e.preventDefault()

    let formData = new FormData(form)
    form.reset()
    let data = { text: formData.get('text') }

    try {
        if (data.text == '') throw new Error('no empty strings, por favor')

        let response = await fetch(`http://localhost:3030/jsonstore/advanced/dropdown`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok == false) {
            let error = await response.json()
            throw new Error(error.message)
        }

    } catch (error) {
        alert(error.message)
    }

    renderOptions()
}

async function getItems() {
    try {
        let response = await fetch(`http://localhost:3030/jsonstore/advanced/dropdown`)
        let result = await response.json()
        if (response.ok == false) {
            let error = await response.json()
            throw new Error(error.message)
        }
        return result

    } catch (error) {
        alert(error.message)
    }
}
