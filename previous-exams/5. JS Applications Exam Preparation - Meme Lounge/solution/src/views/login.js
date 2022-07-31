import { html } from "../../node_modules/lit-html/lit-html.js";

import { login } from "../api/api.js";


let loginTemplate = (submitData) => html`
    <section id="login">
        <form @submit=${submitData}id="login-form">
            <div class="container">
                <h1>Login</h1>
                <label for="email">Email</label>
                <input id="email" placeholder="Enter Email" name="email" type="text">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn button" value="Login">
                <div class="container signin">
                    <p>Dont have an account?<a href="#">Sign up</a>.</p>
                </div>
            </div>
        </form>
    </section>
    `

export function viewLogin(ctx) {
    // console.log('LOGIN PAGE!')
    ctx.render(loginTemplate(submitData));

    async function submitData(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        event.target.reset();   // clear form fields

        if (email == '' || password == '') {
            window.alert('Please fill all requred fields')
            throw new Error('Please fill all requred fields')
        }
        await login(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/all-memes')  //ctx has page object attached to it
    }
}