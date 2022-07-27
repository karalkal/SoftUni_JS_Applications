import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const container = document.querySelector('div.container')


export function showDetails(ctx) {

}

async function getItemDetails(ctx) {
    try {
        const response = await fetch('http://localhost:3030/data/catalog')
        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let allItems = await response.json()
        return allItems
    }

    catch (err) {
        alert(err.message)
        throw new Error(err.message)
    }
}