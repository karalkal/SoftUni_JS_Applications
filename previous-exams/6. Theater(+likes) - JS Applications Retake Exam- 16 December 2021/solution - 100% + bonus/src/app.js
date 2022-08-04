import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';

import { getUserData } from "./util.js";
// import { updateUserNav } from "./views/nav.js";

import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { logoutView } from "./views/logout.js";
import { registerView } from "./views/register.js";
import { detailsView } from "./views/details.js";
import { createView } from "./views/create.js";
import { deleteView } from "./views/delete.js";
import { updateView } from "./views/update.js";
import { profileView } from "./views/profile.js";

// CHANGE ELEMENTS CONTAINER BELOW!
let container = document.querySelector('main#content');

function decorateContext(ctx, next) {
    // rendering method from page attached to ctx, each view can call it directly with relevant template
    ctx.render = (template) => render(template, container)
    ctx.updateUserNav = updateUserNav;

    next();
}


page(decorateContext);

updateUserNav()

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


// function to display relevant nav for logged in users and guests
function updateUserNav() {
    let navBar = document.querySelector('header nav');

    let userData = getUserData();

    let loginBtn = document.getElementById('loginBtn')
    let registerBtn = document.getElementById('registerBtn')

    let profileBtn = document.getElementById('profileBtn')
    let createBtn = document.getElementById('createBtn')
    let logoutBtn = document.getElementById('logoutBtn')

    if (userData) {
        loginBtn.style.display = 'none'
        registerBtn.style.display = 'none'

        profileBtn.style.display = 'inline'
        createBtn.style.display = 'inline'
        logoutBtn.style.display = 'inline'
    } else {
        loginBtn.style.display = 'inline'
        registerBtn.style.display = 'inline'

        profileBtn.style.display = 'none'
        createBtn.style.display = 'none'
        logoutBtn.style.display = 'none'
    }
}






