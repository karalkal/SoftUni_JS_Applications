import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';

import { getUserData } from "./util.js";

import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { logoutView } from "./views/logout.js";
import { registerView } from "./views/register.js";
import { detailsView } from "./views/details.js";
import { createView } from "./views/create.js";
import { deleteView } from "./views/delete.js";
import { updateView } from "./views/update.js";
import { profileView } from "./views/profile.js";


// CHANGE MAIN CONTAINER SELECTOR BELOW!
let container = document.querySelector('main#main-content');


// function to display relevant nav for logged in users and guests
function updateUserNav(ctx, next) {
    let navBar = document.querySelector('header nav');

    let userData = getUserData();

    let userNav = navBar.querySelector('#user')
    let guestNav = navBar.querySelector('#guest')

    if (userData) {
        userNav.style.display = 'inline'
        guestNav.style.display = 'none'

    } else {
        guestNav.style.display = 'inline'
        userNav.style.display = 'none'
    }
}


// rendering method from page attached to ctx, each view can call it directly with relevant template
function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, container)
    ctx.updateUserNav = updateUserNav;

    next();
}

updateUserNav()

page(decorateContext);

page('/', homeView)
page('/login', loginView)
page('/logout', logoutView)
page('/register', registerView)
page('/details/:id', detailsView)
page('/create', createView)
page('/delete/:id', deleteView)
page('/update/:id', updateView)
page('/profile', profileView)

page.start();









