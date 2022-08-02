import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';
import { getUserData } from './util.js'


import { homeView } from "./views/home.js";
import { catalogView } from "./views/catalog.js";
import { loginView } from "./views/login.js";
import { logoutView } from "./views/logout.js";
import { registerView } from "./views/register.js";
import { detailsView } from "./views/details.js";
import { createView } from "./views/create.js";
import { deleteView } from "./views/delete.js";
import { updateView } from "./views/update.js";
import { searchView } from "./views/search.js";

// CHANGE ELEMENTS CONTAINER BELOW!
let container = document.querySelector('main#main-content');

function decorateContext(ctx, next) {
    // rendering method from page attached to ctx, each view can call it directly with relevant template
    ctx.render = (template) => render(template, container)
    ctx.updateUserNav = updateUserNav;

    next();
}


page(decorateContext);

page('/', homeView)
page('/catalog', catalogView)
page('/login', loginView)
page('/logout', logoutView)
page('/register', registerView)
page('/details/:id', detailsView)
page('/create', createView)
page('/delete/:id', deleteView)
page('/update/:id', updateView)
page('/search', searchView)

updateUserNav();

page.start();

// function to display relevant nav for logged in users and guests
function updateUserNav() {
    let navBar = document.querySelector('nav');

    let userData = getUserData()

    let loginBtn = navBar.querySelector('.loginBtn')
    let regBtn = navBar.querySelector('.regBtn')
    let logoutBtn = navBar.querySelector('.logoutBtn')
    let createBtn = navBar.querySelector('.createBtn')

    if (userData) {
        logoutBtn.style.display = 'inline'
        createBtn.style.display = 'inline'
        loginBtn.style.display = 'none'
        regBtn.style.display = 'none'
    } else {
        logoutBtn.style.display = 'none'
        createBtn.style.display = 'none'
        loginBtn.style.display = 'inline'
        regBtn.style.display = 'inline'
    }
}

