import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';

const container = document.querySelector('div.container')

export function showLogin() {
    render(loginTemplate(), container)

    page.redirect('catalog/')
}

const loginTemplate = () => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
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
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>
`

async function onSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');

    try {
        let response = await fetch(`http://localhost:3030/users/login`, {
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

        loginView()
    }
    catch (err) {
        alert(err.message)
        throw new Error(err.message)
    }
}