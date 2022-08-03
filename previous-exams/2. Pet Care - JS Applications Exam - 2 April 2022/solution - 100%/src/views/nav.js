/*

import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from '../../node_modules/page/page.mjs';

import { getUserData } from "../util.js";


const navBar = document.querySelector('header#navigation');

const userNavTemplate = (userData) => html`
    <nav>
        <section class="logo">
            <img src="./images/logo.png" alt="logo">
        </section>
        <ul>
            <!--Users and Guest-->
            <li><a href="/">Home</a></li>
            <li><a href="/catalog">Dashboard</a></li>
    
            ${!userData
        ? html`
            <!--Only Guest-->
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            `
        : html`
            <!--Only User-->
            <li><a href="/create">Create Postcard</a></li>
            <li><a href="/logout">Logout</a></li>
            `}
        </ul>
    </nav>
    `


export function updateUserNav(ctx, next) {
    let userData = getUserData();

    render(userNavTemplate(userData), navBar)

    return next()

}


*/