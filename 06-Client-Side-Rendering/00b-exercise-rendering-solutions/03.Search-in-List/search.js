import { html, render } from './node_modules/lit-html/lit-html.js'
import { towns } from './towns.js'


document.getElementsByTagName('button')[0].addEventListener('click', search)
const container = document.querySelector('div#towns')
const resultDiv = document.getElementById('result')
let matches = 0

const createList = () => html`
   <ul> ${towns.map(t => html` <li>${t}</li>`)}</ul>
   `

render(createList(), container)

function search() {
   matches = 0
   let result = html`
   <ul> ${towns.map(checkMatch)}</ul>`

   resultDiv.textContent = `${matches} matches found`

   render(result, container)
}

function checkMatch(town) {
   const searchTerm = document.getElementById('searchText').value

   if (town.toLowerCase().includes(searchTerm.toLowerCase())) {
      matches++
      return html`<li class="active">${town}</li>`
   }
   else {
      return html`<li>${town}</li>`
   }
}
