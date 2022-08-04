import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';
import { getUserData } from './util.js'


import { homeView } from "./views/home.js";
import { catalogView } from "./views/catalog.js";
import { loginView } from "./views/login.js";
import { logoutView } from "./views/logout.js";
import { registerView } from "./views/register.js";
import { detailsView} from "./views/details.js";
import { profileView } from "./views/profile.js";
import { createView } from "./views/create.js";
import { deleteView } from "./views/delete.js";
import { updateView } from "./views/update.js";

// CHANGE ELEMENTS CONTAINER BELOW!
let container = document.querySelector('main#site-content');

function decorateContext(ctx, next) {
    // rendering method from page attached to ctx, each view can call it directly with relevant template
    ctx.render = (template) => render(template, container)
    ctx.updateUserNav = updateUserNav;

    next();
}


page(decorateContext);

page('/', homeView)
page('/catalog', catalogView)
page('/profile', profileView)
page('/login', loginView)
page('/logout', logoutView)
page('/register', registerView)
page('/details/:id', detailsView)
page('/create', createView)
page('/update/:id', updateView)
page('/delete/:id', deleteView)

updateUserNav();
page.start();

// function to display relevant nav for logged in users and guests
function updateUserNav() {
    let navBar = document.querySelector('nav');

    let userData = getUserData()

    let userMenu = navBar.querySelector('.user')
    let guestMenu = navBar.querySelector('.guest')

    if (userData) {
        userMenu.style.display = 'block'
        guestMenu.style.display = 'none'
        let span = userMenu.getElementsByTagName('span')[0]
        span.textContent = 'Welcome, ' + userData.username
    } else {
        userMenu.style.display = 'none'
        guestMenu.style.display = 'block'
    }
}

