import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMine } from "../api/data.js"
import { getUserData } from "../util.js"

const profileTemplate = (myTheatres, userEmail) => html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${userEmail}</h2>
        </div>
        <div class="board">
    
            ${myTheatres.length > 0
        ? myTheatres.map(th => html`
            <!--If there are event-->
            <div class="eventBoard">
                <div class="event-info">
                    <img src=${th.imageUrl}>
                    <h2>${th.title}</h2>
                    <h6>${th.date}</h6>
                    <a href="/details/${th._id}" class="details-button">Details</a>
                </div>
            </div>
            `)
        : html`
            <!--If there are no event-->
            <div class="no-events">
                <p>This user has no events yet!</p>
            </div>
            `
        }
    
        </div>
    </section>
    `


export async function profileView(ctx) {
    let currentUser = await getUserData()
    let myTheatres = await getMine(currentUser.id)

    ctx.render(profileTemplate(myTheatres, currentUser.email))
}