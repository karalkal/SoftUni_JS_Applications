import { html } from "../../node_modules/lit-html/lit-html.js";

import { register } from "../api/api.js";


let registerTemplate = (submitData) => html`
    <section id="register">
        <form @submit=${submitData} id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>
    `

export function viewRegister(ctx) {
    ctx.render(registerTemplate(submitData));

    async function submitData(event) {
        event.preventDefault();

        let formData = new FormData(event.target);
        let username = formData.get('username').trim();
        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('repeatPass').trim();
        let gender = formData.get('gender').trim();

        event.target.reset();   // clear form fields

        if (username == '' || email == '' || password == '' || rePass == '' || gender == '') {
            return alert('Please fill all requred fields')
        }

        if (password != rePass) {
            return alert('Password entries do not match')
        }
        await register(username, email, password, gender);
        ctx.updateUserNav();
        ctx.page.redirect('/all-memes')  //ctx has page object attached to it
    }
}