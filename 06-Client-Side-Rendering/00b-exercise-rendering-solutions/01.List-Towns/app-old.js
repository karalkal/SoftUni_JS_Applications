import { html, render } from "./node_modules/lit-html/lit-html.js";

const input = document.getElementById('towns')

const ul = document.createElement('ul')
document.getElementById('root').appendChild(ul)

document.getElementById('btnLoadTowns').addEventListener('click', (ev) => {
    ev.preventDefault()
    let towns = input.value.split(', ')

    render(towns.map(createLiElement), ul)           // shorter better option

    // let litHTMLObjects = []
    // towns.forEach(town => litHTMLObjects.push(createLiElement(town)))       //experiment
    // render(litHTMLObjects, ul)

})

function createLiElement(town) {
    return html`
    <li>${town}</li>
    `
}

