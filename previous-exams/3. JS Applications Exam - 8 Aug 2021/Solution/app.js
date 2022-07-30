import page from './node_modules/page/page.mjs'
import { html, render } from '../node_modules/lit-html/lit-html.js'


import { viewDashboard } from './views/dashboard.js'
import { viewLogin } from './views/login.js'
import { viewLogout } from './views/logout.js'
import { viewRegister } from './views/register.js'
import { viewDetails } from './views/details.js'
import { viewCreate } from './views/create.js'
import { viewEdit } from './views/edit.js'
import { viewOwnCollection } from './views/my-books.js'
import { deleteItem } from './views/delete.js'


page('/', updateMenu, viewDashboard)
page('/login', updateMenu, viewLogin)
page('/logout', updateMenu, viewLogout)
page('/register', updateMenu, viewRegister)
page('/details/:id', updateMenu, viewDetails)
page('/create', updateMenu, viewCreate)
page('/edit/:id', updateMenu, viewEdit)
page('/my-books', updateMenu, viewOwnCollection)
page('/delete/:id', updateMenu, deleteItem)

page.start()



function updateMenu(ctx, next) {

    let navContainer = document.querySelector('nav.navbar')


    const menuTemplate = (loggedUser) => html`
    <section class="navbar-dashboard">
        <a href="/">Dashboard</a>
    
        ${loggedUser
            ? html`
        <div id="user">
            <span>Welcome, ${loggedUser}</span>
            <a class="button" href="/my-books">My Books</a>
            <a class="button" href="/create">Add Book</a>
            <a class="button" href="/logout">Logout</a>
        </div>`
            : html`
        <div id="guest">
            <a class="button" href="/login">Login</a>
            <a class="button" href="/register">Register</a>
        </div>
        `
        }
    </section>
    `


    console.log(navContainer)
    let loggedUser = localStorage.getItem('userEmail')
    render(menuTemplate(loggedUser), navContainer)

    next()
}






// function updateMenu(ctx, next) {
//     let userEmail = localStorage.getItem('userEmail')

//     let userMenu = document.querySelector('div#user')
//     let guestMenu = document.querySelector('div#guest')

//     if (localStorage.length == 0) {
//         userMenu.style.display = 'none'
//         guestMenu.style.display = 'flex'
//     } else {
//         userMenu.style.display = 'flex'
//         guestMenu.style.display = 'none'
//     }

//     next()
// }