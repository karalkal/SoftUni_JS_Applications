import page from '../node_modules/page/page.mjs'


export async function viewLogout() {
    let sessionToken = localStorage.getItem('token')
    // console.log(sessionToken)

    await fetch(`http://localhost:3030/users/logout`, {
        method: 'get',
        headers: { "X-Authorization": sessionToken },
    })

    localStorage.clear()

    page.redirect('/')
}