import page from './node_modules/page/page.mjs'
import { viewDashboard } from './views/dashboard.js'
import { viewLogin } from './views/login.js'
import { viewLogout } from './views/logout.js'
import { viewRegister } from './views/register.js'
import { viewDetails } from './views/details.js'
import { deleteItem } from './views/delete.js'
import { viewCreate } from './views/create.js'
import { viewEdit } from './views/edit.js'
import { viewOwnDashboard } from './views/my-items.js'

page(updateMenu)

page('/', viewDashboard)
page('/login', viewLogin)
page('/logout', viewLogout)
page('/register', viewRegister)
page('/details/:id', viewDetails)
page('/edit/:id', viewEdit)
page('/my-posts', viewOwnDashboard)
page('/create', viewCreate)
page('/delete/:id', deleteItem)

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