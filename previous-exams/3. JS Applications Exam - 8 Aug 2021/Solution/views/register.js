import { html, render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'


const container = document.querySelector('main#site-content')

export function viewRegister(ctx) {
    render(registerTemplate(), container)
}

const registerTemplate = () => html`
    <section id="register-page" class="register">
        <form id="register-form" action="" method="" @submit=${submitData}>
            <fieldset>
                <legend>Register Form</legend>
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
                <p class="field">
                    <label for="repeat-pass">Repeat Password</label>
                    <span class="input">
                        <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Register">
            </fieldset>
        </form>
    </section>
    `

async function submitData(event) {
    event.preventDefault()

    let formData = new FormData(event.target)
    let email = formData.get('email')
    let password = formData.get('password')
    let repeatPassword = formData.get('confirm-pass')

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
            let err = await response.json()
            throw new Error(err.message)
        }

        let loginData = await response.json()  // after successfull registration user will be logged in, response will contain accessToken

        localStorage.setItem('token', loginData.accessToken)
        localStorage.setItem('userID', loginData._id)
        localStorage.setItem('userEmail', loginData.email)


        page.redirect('/')

    } catch (error) {
        throw new Error(error.message)
    }
}