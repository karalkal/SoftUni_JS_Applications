import { html } from "../../node_modules/lit-html/lit-html.js";

import { register } from "../api/users.js";


let registerTemplate = (submitData) => html`
    <section id="register-page" class="auth">
        <form @submit=${submitData} id="register">
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