import { html } from "../../node_modules/lit-html/lit-html.js";

import { register } from "../api/users.js";


let registerTemplate = (submitData) => html`
    <section id="registerPage">
        <form @submit=${submitData} class="registerForm">
            <h2>Register</h2>
            <div class="on-dark">
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>

            <div class="on-dark">
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>

            <div class="on-dark">
                <label for="repeatPassword">Repeat Password:</label>
                <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
            </div>

            <button class="btn" type="submit">Register</button>

            <p class="field">
                <span>If you have profile click <a href="/login">here</a></span>
            </p>
        </form>
    </section>
    `

export function registerView(ctx) {
    ctx.render(registerTemplate(submitData));

    async function submitData(event) {

        event.preventDefault();


        let formData = new FormData(event.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('repeatPassword').trim();

        event.target.reset();   // clear form fields

        if (email == '' || password == '' || rePass == '') {
            return alert('Please fill all requred fields')
        }

        if (password != rePass) {
            return alert('Password entries do not match')
        }
        await register(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/')  //ctx has page object attached to it
    }
}