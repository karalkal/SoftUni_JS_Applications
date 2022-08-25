import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/users.js";


let loginTemplate = (submitData) => html`
    <section @submit=${submitData} id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
      </section>
    `

export function loginView(ctx) {
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
        ctx.page.redirect('/catalog')  //ctx has page object attached to it
    }
}
