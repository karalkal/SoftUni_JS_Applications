import { render } from "../node_modules/lit-html/lit-html.js";
import page from '../node_modules/page/page.mjs';

import { updateUserNav } from "./views/menu.js";

import { viewHome } from "./views/home.js";
import { viewAll } from "./views/all-memes.js";
import { viewLogin } from "./views/login.js";
import { viewLogout } from "./views/logout.js";
import { viewRegister } from "./views/register.js";
import { viewDetails } from "./views/details.js";
import { viewProfile } from "./views/profile.js";
import { viewCreate } from "./views/create.js";
import { viewDelete } from "./views/delete.js";
import { viewUpdate } from "./views/update.js";

// CHANGE ELEMENTS CONTAINER BELOW!
let container = document.querySelector('main#site-content');

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container)        // rendering method function from page attached to ctx
    ctx.updateUserNav = updateUserNav;
    // ctx.getUserData = getUserData

    next();
}

page(decorateContext);

page('/', viewHome)
page('/all-memes', viewAll)
page('/profile', viewProfile)
page('/login', viewLogin)
page('/logout', viewLogout)
page('/register', viewRegister)
page('/details/:id', viewDetails)
page('/create', viewCreate)
page('/update/:id', viewUpdate)
page('/delete/:id', viewDelete)


updateUserNav();

page.start();