import { html, render } from "./node_modules/lit-html/lit-html.js";

const input = document.getElementById('towns')

let container = document.getElementById('root')

document.getElementById('btnLoadTowns').addEventListener('click', displayAll)

render(displayAll(), container )

function displayAll(ev) {
    ev.preventDefault()
    let towns = input.value.split(', ')

    return html`
    <ul> ${towns.map(createLiElement)}</ul>   `


    // let litHTMLObjects = []
    // towns.forEach(town => litHTMLObjects.push(createLiElement(town)))       //experiment
    // render(litHTMLObjects, ul)

}

function createLiElement(town) {
    return html`
    <li>${town}</li>
    `
}

