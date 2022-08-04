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

// CHANGE ELEMENTS CONTAINER BELOW!
let container = document.querySelector('main#main-content');

function decorateContext(ctx, next) {
    // rendering method from page attached to ctx, each view can call it directly with relevant template
    ctx.render = (template) => render(template, container)
    ctx.updateUserNav = updateUserNav;

    next();
}

updateUserNav();

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


page.start();

// function to display relevant nav for logged in users and guests
function updateUserNav() {
    let navBar = document.querySelector('nav');

    let userData = getUserData();

    let userNav = navBar.querySelector('#user')
    let guestNav = navBar.querySelector('#guest')

    if (userData) {
        guestNav.style.display = 'none'
        userNav.style.display = 'inline'
    } else {
        guestNav.style.display = 'inline'
        userNav.style.display = 'none'
    }
}

