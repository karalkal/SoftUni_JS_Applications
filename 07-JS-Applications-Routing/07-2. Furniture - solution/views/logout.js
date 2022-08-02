import page from '../node_modules/page/page.mjs'
import { displayMenuItems } from '../app.js'


export async function logOutUser() {
    let response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {'X-Authorization': localStorage.token}
    })

    localStorage.clear()
    displayMenuItems()
    page.redirect('/')
}