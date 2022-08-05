import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util.js";


// function to display relevant nav for logged in users and guests
export function updateUserNav() {
    let navBar = document.querySelector('nav.navbar');

    let userData = getUserData()

    const menuTemplate = (userData) => html`
    <section class="navbar-dashboard">
        <a href="/">Dashboard</a>
    
        ${userData
            ? html`
        <div id="user">
            <span>Welcome, ${userData.email}</span>
            <a class="button" href="/my-books">My Books</a>
            <a class="button" href="/create">Add Book</a>
            <a class="button" href="/logout">Logout</a>
        </div>
        `
            : html`
        <div id="guest">
            <a class="button" href="/login">Login</a>
            <a class="button" href="/register">Register</a>
        </div>
        `
        }
    </section>`

    render(menuTemplate(userData), navBar)
}

