import page from './node_modules/page/page.mjs';

import { showLogin } from '../views/login.js';
import { showCatalog } from '../views/catalog.js';

page('/', showCatalog)
page('/catalog', showCatalog)
page('/login', showLogin)

page.start()

displayMenuItems();

function displayMenuItems() {
    let userDiv = document.querySelector('div#user');
    let guestDiv = document.querySelector('div#guest');
    let userLoggedIn = localStorage.length === 0 ? false : true;

    if (userLoggedIn) {
        guestDiv.style.display = 'none';
    } else {
        userDiv.style.display = 'none';
    }
}