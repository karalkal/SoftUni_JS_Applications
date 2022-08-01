import { html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util.js"; 


const homeTemplate = (ctx, userData) => {
    if (!userData) {         //if user is not logged in
        return html`
        <section id="welcome">
            <div id="welcome-container">
                <h1>Welcome To Meme Lounge</h1>
                <img src="/images/welcome-meme.jpg" alt="meme">
                <h2>Login to see our memes right away!</h2>
                <div id="button-div">
                    <a href="/login" class="button">Login</a>
                    <a href="/register" class="button">Register</a>
                </div>
            </div>
        </section>
            `
    } else {
        ctx.page.redirect('/catalog')
    }
}


export async function homeView(ctx) {
    let userData = getUserData()

    ctx.render(homeTemplate(ctx, userData))
}