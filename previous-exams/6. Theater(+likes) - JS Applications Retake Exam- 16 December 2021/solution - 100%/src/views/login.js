import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/users.js";


let loginTemplate = (submitData) => html`
    <section id="loginaPage">
        <form @submit=${submitData} class="loginForm">
            <h2>Login</h2>
            <div>
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
            <button class="btn" type="submit">Login</button>
            <p class="field">
                <span>If you don't have profile click <a href="register">here</a></span>
            </p>
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
