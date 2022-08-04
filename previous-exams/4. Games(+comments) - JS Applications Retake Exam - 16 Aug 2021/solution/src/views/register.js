import { html } from "../../node_modules/lit-html/lit-html.js";

import { register } from "../api/users.js";


let registerTemplate = (submitData) => html`
    <section id="register-page" class="content auth">
        <form @submit=${submitData} id="register">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Register</h1>
    
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="maria@email.com">
    
                <label for="pass">Password:</label>
                <input type="password" name="password" id="register-password">
    
                <label for="con-pass">Confirm Password:</label>
                <input type="password" name="confirm-password" id="confirm-password">
    
                <input class="btn submit" type="submit" value="Register">
    
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </div>
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
        let rePass = formData.get('confirm-password').trim();

        event.target.reset();   // clear form fields
        console.log(email, password)


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