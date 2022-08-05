import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/users.js";


let loginTemplate = (submitData) => html`
    <section id="login">
        <div class="container">
            <form @submit=${submitData} id="login-form" action="#" method="post">
                <h1>Login</h1>
                <p>Please enter your credentials.</p>
                <hr>

                <p>Username</p>
                <input placeholder="Enter Username" name="username" type="text">

                <p>Password</p>
                <input type="password" placeholder="Enter Password" name="password">
                <input type="submit" class="registerbtn" value="Login">
            </form>
            <div class="signin">
                <p>Dont have an account?
                    <a href="/register">Sign up</a>.
                </p>
            </div>
        </div>
    </section>
    `

export function loginView(ctx) {
    // console.log('LOGIN PAGE!')
    ctx.render(loginTemplate(submitData));

    async function submitData(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let username = formData.get('username').trim();
        let password = formData.get('password').trim();

        event.target.reset();   // clear form fields

        if (username == '' || password == '') {
            return alert('Please fill all requred fields')
        }
        await login(username, password);
        ctx.updateUserNav();
        ctx.page.redirect('/catalog')  //ctx has page object attached to it
    }
}
