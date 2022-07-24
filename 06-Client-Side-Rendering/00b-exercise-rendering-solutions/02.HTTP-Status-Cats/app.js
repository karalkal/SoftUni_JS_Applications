import { cats } from './catSeeder.js'
import { html, render } from './node_modules/lit-html/lit-html.js'

const container = document.querySelector('section#allCats')

const template = () => html`<ul> ${cats.map(createCard)}</ul>`

render(template(), container)

function createCard(cat) {
    return html`    
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn" @click=${toggleButtonAction}>Show status code</button>
            <div class="status" style="display: none" id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
    </li>
    `
}

function toggleButtonAction(event) {
    let divInfo = event.target.parentElement.children[1]

    if (event.target.classname = "showBtn") {
        let btn = event.target

        if (btn.textContent === 'Show status code') {
            btn.textContent = 'Hide status code'
            divInfo.style.display = 'block'
        } else if (btn.textContent === 'Hide status code') {
            btn.textContent = 'Show status code'
            divInfo.style.display = 'none'
        }
    }
}
