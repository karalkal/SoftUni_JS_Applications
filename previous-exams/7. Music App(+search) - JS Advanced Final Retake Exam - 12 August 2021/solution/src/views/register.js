import { html } from "../../node_modules/lit-html/lit-html.js";

import { register } from "../api/users.js";


let registerTemplate = (submitData) => html`
    <section id="registerPage">
        <form @submit=${submitData}>
            <fieldset>
                <legend>Register</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">
    
                <button type="submit" class="register">Register</button>
    
                <p class="field">
                    <span>If you already have profile click <a href="#">here</a></span>
                </p>
            </fieldset>
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
        let rePass = formData.get('conf-pass').trim();

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