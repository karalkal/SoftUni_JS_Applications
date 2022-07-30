import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'


const container = document.querySelector('main#site-content')

export function viewLogin(ctx) {
    render(loginTemplate(), container)
}

const loginTemplate = () => html`
    <section id="login-page" class="login">
        <form id="login-form" action="" method="" @submit=${submitData}>
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
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
            let err = await response.json()
            throw new Error(err.message)
        }

        let loginData = await response.json()

        localStorage.setItem('token', loginData.accessToken)
        localStorage.setItem('userID', loginData._id)
        localStorage.setItem('userEmail', loginData.email)
        // console.log(localStorage.getItem('token'))
        // console.log(localStorage.getItem('userID'))
        // console.log(localStorage.getItem('userEmail'))

        page.redirect('/')

    } catch (error) {
        throw new Error(error.message)
    }
}