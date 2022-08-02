import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/users.js";


let loginTemplate = (submitData) => html`
    <section id="loginPage">
        <form @submit = ${submitData}>
            <fieldset>
                <legend>Login</legend>
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <button type="submit" class="login">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
    `

export function loginView(ctx) {
    // console.log('LOGIN PAGE!')
    ctx.render(loginTemplate(submitData));

    async function submitData(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        event.target.reset();   // clear form fields

        if (email == '' || password == '') {
            return alert('Please fill all requred fields')
        }
        await login(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/')  //ctx has page object attached to it
    }
}
