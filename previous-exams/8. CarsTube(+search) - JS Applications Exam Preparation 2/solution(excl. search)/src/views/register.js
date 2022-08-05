import { html } from "../../node_modules/lit-html/lit-html.js";

import { register } from "../api/users.js";


let registerTemplate = (submitData) => html`
    <section id="register">
        <div class="container">
            <form @submit=${submitData} id="register-form">
                <h1>Register</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>

                <p>Username</p>
                <input type="text" placeholder="Enter Username" name="username" required>

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password" required>

                <p>Repeat Password</p>
                <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                <hr>

                <input type="submit" class="registerbtn" value="Register">
            </form>
            <div class="signin">
                <p>Already have an account?
                    <a href="/login">Sign in</a>.
                </p>
            </div>
        </div>
    </section>
    `

export function registerView(ctx) {
    ctx.render(registerTemplate(submitData));

    async function submitData(event) {

        event.preventDefault();


        let formData = new FormData(event.target);
        let username = formData.get('username').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('repeatPass').trim();

        event.target.reset();   // clear form fields

        if (username == '' || password == '' || rePass == '') {
            return alert('Please fill all requred fields')
        }

        if (password != rePass) {
            return alert('Password entries do not match')
        }
        await register(username, password);
        ctx.updateUserNav();
        ctx.page.redirect('/catalog')  //ctx has page object attached to it
    }
}