import { html } from "../../node_modules/lit-html/lit-html.js";

import { register } from "../api/api.js";


let registerTemplate = (submitData) => html`
    <section id="register-page" class="register">
        <form @submit=${submitData} id="register-form" action="" method="">
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

export function viewRegister(ctx) {
    ctx.render(registerTemplate(submitData));

    async function submitData(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('confirm-pass').trim();

        event.target.reset();   // clear form fields

        if (email == '' || password == '' || rePass == '') {
            return alert('Please fill all requred fields')
            // throw new Error('Please fill all requred fields')
        }

        if (password != rePass) {
            return alert('Password entries do not match')
            // throw new Error('Password entries do not match')
        }

        await register(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/')  //ctx has page object attached to it
    }
}