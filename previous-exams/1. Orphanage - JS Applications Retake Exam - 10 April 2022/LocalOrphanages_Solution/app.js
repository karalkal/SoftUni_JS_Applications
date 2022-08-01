import page from './node_modules/page/page.mjs'
import { viewDashboard } from './views/dashboard.js'
import { viewLogin } from './views/login.js'
import { viewLogout } from './views/logout.js'
import { viewRegister } from './views/register.js'
import { viewDetails } from './views/details.js'
import { deleteItem } from './views/delete.js'
import { viewCreate } from './views/create.js'
import { viewEdit } from './views/edit.js'
import { viewOwnDashboard } from './my-items.js'


page('/', updateMenu, viewDashboard)
page('/login', updateMenu, viewLogin)
page('/logout', updateMenu, viewLogout)
page('/register', updateMenu, viewRegister)
page('/details/:id', updateMenu, viewDetails)
page('/edit/:id', updateMenu, viewEdit)
page('/my-posts', updateMenu, viewOwnDashboard)
page('/create', updateMenu, viewCreate)
page('/delete/:id', updateMenu, deleteItem)

page.start()

function updateMenu(ctx, next) {
    let userMenu = document.querySelector('div#user')
    let guestMenu = document.querySelector('div#guest')

    if (localStorage.length == 0) {
        userMenu.style.display = 'none'
        guestMenu.style.display = 'flex'
    } else {
        userMenu.style.display = 'flex'
        guestMenu.style.display = 'none'
    }

    next()
}