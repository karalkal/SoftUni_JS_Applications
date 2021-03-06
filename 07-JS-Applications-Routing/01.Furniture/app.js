import page from './node_modules/page/page.mjs';

import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { logOutUser } from './views/logout.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showMyItems } from './views/my-furniture.js';
import { createItem } from './views/create.js';
import { updateItem } from './views/update.js';
import { deleteItem } from './views/delete.js';

page('/', showCatalog)
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/catalog/:itemID', showDetails);
page('/my-furniture', showMyItems)
page('/create', createItem)
page('/update/:itemID', updateItem)
page('/delete/:itemID', deleteItem)

document.getElementById('logoutBtn').addEventListener('click', logOutUser)

page.start();

displayMenuItems();

export function displayMenuItems() {
    let userDiv = document.querySelector('div#user');
    let guestDiv = document.querySelector('div#guest');
    let userLoggedIn = localStorage.length === 0 ? false : true;

    if (userLoggedIn) {
        userDiv.style.display = 'inline-block';
        guestDiv.style.display = 'none';
    } else {
        guestDiv.style.display = 'inline-block';
        userDiv.style.display = 'none';
    }
}