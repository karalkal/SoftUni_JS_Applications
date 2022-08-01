import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util.js";


// function to display relevant nav for logged in users and guests
export function updateUserNav() {
    let navBar = document.querySelector('nav.navbar');

    let userData = getUserData()

    const menuTemplate = (userData) => html`
    <section class="navbar-dashboard">
        <a href="/all-memes">All Memes</a>
        <!-- Logged users -->
    
        ${userData
        ? html`
        <div class="user">
            <a href="/create">Create Meme</a>
            <div class="profile">
                <span>Welcome, ${userData.email}</span>
                <a href="/profile">My Profile</a>
                <a href="/logout">Logout</a>
            </div>
        </div>
        `
        : html`
        <!-- Guest users -->
        <div class="guest">
            <div class="profile">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
            <a class="active" href="/">Home Page</a>
        </div>
        `
        }
    </section>
    `

    render(menuTemplate(userData), navBar)
}

