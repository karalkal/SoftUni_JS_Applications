import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/users.js";


let loginTemplate = (submitData) => html`
    <section id="login-page" class="auth">
        <form @submit=${submitData} id="login">
            <h1 class="title">Login</h1>
            <article class="input-group">
                <label for="login-email">Email: </label>
                <input type="email" id="login-email" name="email">
            </article>
            <article class="input-group">
                <label for="password">Password: </label>
                <input type="password" id="password" name="password">
            </article>

            <input type="submit" class="btn submit-btn" value="Log In">
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
