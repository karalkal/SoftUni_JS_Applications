import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getPetById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (pet, isOwner, loggedInUser) => html`
    <section id="detailsPage">
        <div class="details">
            <div class="animalPic">
                <img src=${pet.image}>
            </div>
            <div>
                <div class="animalInfo">
                    <h1>Name: ${pet.name}</h1>
                    <h3>Breed: ${pet.breed}</h3>
                    <h4>Age: ${pet.age} years</h4>
                    <h4>Weight: ${pet.weight}</h4>
                    <h4 class="donation">Donation: 0$</h4>
                </div>
    
                ${!loggedInUser
            ? nothing
            : html`
                <!-- if there is no registered user, do not display div-->
                <div class="actionBtn">
    
                    ${isOwner
                   ? html`
                    <!-- Only for registered user and creator of the pets-->
                    <a href="/update/${pet._id}" class="edit">Edit</a>
                    <a href="/delete/${pet._id}" class="remove">Delete</a>
                    `
                    : html`
                    <!--Bonus Part Only for no creator and user-->
                    <a href="#" class="donate">Donate</a>
                    `}

                </div>
                `}
            </div>
        </div>
    </section>
        `

export async function detailsView(ctx) {
    let pet = await getPetById(ctx.params.id);

    let loggedInUser = await getUserData()

    let isOwner = false                             // by default it's false

    if (loggedInUser) {
        isOwner = pet._ownerId == loggedInUser.id  // true / false
    }

    ctx.render(detailsTemplate(pet, isOwner, loggedInUser));
}
