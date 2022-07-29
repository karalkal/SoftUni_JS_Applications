import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'


const container = document.querySelector('main#main-content')

export function viewRegister(ctx) {
    render(registerTemplate(), container)
}

const registerTemplate = () => html`
    <section id="register-page" class="auth">
        <form id="register" @submit=${submitData}>
            <h1 class="title">Register</h1>
    
            <article class="input-group">
                <label for="register-email">Email: </label>
                <input type="email" id="register-email" name="email">
            </article>
    
            <article class="input-group">
                <label for="register-password">Password: </label>
                <input type="password" id="register-password" name="password">
            </article>
    
            <article class="input-group">
                <label for="repeat-password">Repeat Password: </label>
                <input type="password" id="repeat-password" name="repeatPassword">
            </article>
    
            <input type="submit" class="btn submit-btn" value="Register">
        </form>
    </section>
    `

async function submitData(event) {
    event.preventDefault()

    let formData = new FormData(event.target)
    let email = formData.get('email')
    let password = formData.get('password')
    let repeatPassword = formData.get('repeatPassword')

    try {
        if (password != repeatPassword) {
            throw new Error('Password entries don\'t match')
        }
        if (password === '' || repeatPassword === '' || email === '') {
            throw new Error('Some required fileds have been left empty.')
        }

        let response = await fetch(`http://localhost:3030/users/register`, {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        if (response.ok == false) {
            let err = response.json()
            throw new Error(err.message)
        }

        let loginData = await response.json()  // after successfull registration user will be logged in, response will contain accessToken

        localStorage.setItem('token', loginData.accessToken)
        localStorage.setItem('userID', loginData._id)

        page.redirect('/')

    } catch (error) {
        throw new Error(error.message)
    }
}