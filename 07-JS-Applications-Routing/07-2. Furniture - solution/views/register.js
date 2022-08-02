import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { displayMenuItems } from '../app.js'

const container = document.querySelector('div.container')

export function showRegister() {
    render(registerTemplate(), container)
}

const registerTemplate = () => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Register New User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${onSubmit}>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="rePass">Repeat</label>
                    <input class="form-control" id="rePass" type="password" name="rePass">
                </div>
                <input type="submit" class="btn btn-primary" value="Register" />
            </div>
        </div>
    </form>
    `

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('rePass');

    document.querySelector('form').reset()

    if (password != rePass) throw new Error('password entries do not match')
    if (password == '' || rePass == '' || email == '') throw new Error('some fields have been left empty')

    try {
        let response = await fetch(`http://localhost:3030/users/register`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (response.ok == false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        // if all is fine, get token and _id and set them in locaStorage
        let data = await response.json();
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('ownerId', data._id)

        showRegister()

        displayMenuItems();

        page.redirect('/catalog')

    }
    catch (err) {
        alert(err.message)
        throw new Error(err.message)
    }
}