import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'


const container = document.querySelector('main#main-content')

export function viewLogin(ctx) {
    // console.log('login', ctx)
    render(loginTamplate(), container)
}

const loginTamplate = () => html`
    <section id="login-page" class="auth">
        <form id="login" @submit=${submitData}>
            <h1 class="title">Login</h1>
    
            <article class="input-group">
                <label for="login-email">Email: </label>
                <input type="email" id="login-email" name="email">
            </article>
    
            <article class="input-group">
                <label for="password">Password: </label>
                <input type="password" id="password" name="password">
            </article>
    
            <input type="submit" class="btn submit-btn" value="Log In">
        </form>
    </section>
    `

async function submitData(event) {
    event.preventDefault()

    let formData = new FormData(event.target)
    let email = formData.get('email')
    let password = formData.get('password')

    try {
        if (password === '' || email === '') {
            throw new Error('Some required fileds have been left empty.')
        }

        let response = await fetch(`http://localhost:3030/users/login`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        if (response.ok == false) {
            let err = response.json()
            throw new Error(err.message)
        }

        let loginData = await response.json()
        // console.log(loginData)

        localStorage.setItem('token', loginData.accessToken)
        localStorage.setItem('userID', loginData._id)
        // console.log(localStorage.getItem('token'))
        // console.log(localStorage.getItem('userID'))

        page.redirect('/')

    } catch (error) {
        throw new Error(error.message)
    }
}