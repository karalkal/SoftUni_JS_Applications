import { html, render } from './node_modules/lit-html/lit-html.js'


window.onload = solve()


function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const tbody = document.querySelector('tbody')
   let searchTerm = null

   const rowTemplate = (entry) => html`
   <tr class=${searchEntry(entry) ? "select" : "" }>
      <td>${entry.firstName} ${entry.lastName}</td>
      <td>${entry.email}</td>
      <td>${entry.course}</td>
   </tr>
      `
   renderTable()

   // on click search is activated actually
   function onClick() {
      searchTerm = document.querySelector('input#searchField').value
      document.querySelector('input#searchField').value = ''   // clear

      renderTable()
   }

   function searchEntry(entry) {
      let entryContent = (Object.values(entry).map(e => e.toLowerCase()))
      for (let td of entryContent) {
         if (searchTerm && td.includes(searchTerm.toLowerCase())) {
            return true
         }
      }
      return false
   }

   async function renderTable() {
      let tabledata = await getData()
      render(Object.values(tabledata).map(rowTemplate), tbody)
   }

   async function getData() {
      let response = await fetch('http://localhost:3030/jsonstore/advanced/table')
      return await response.json()
   }
}