import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getPetById, getTotalDonationsById, checkUserDonationStatus } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (pet, isOwner, loggedInUser, donatedAmount, hasNotDonated) => {

    // console.log(donatedAmount, hasNotDonated)
    return html`
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
                    <h4 class="donation">Donation: ${donatedAmount}$</h4>
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
                    <!--If hasDonated btn should not appear-->
    
                    ${hasNotDonated
                        ? html`
                    <a href="/donate/${pet._id}" class="donate">Donate</a>
                    `
                        : nothing}
                    `}
    
                </div>
                `}
            </div>
        </div>
    </section>
        `
}

export async function detailsView(ctx) {
    let animalId = ctx.params.id
    let loggedInUser = getUserData()

    let [pet, numOfDonations] = await Promise.all(      // I am pretty sure the request urls are wrong
        [
            getPetById(animalId),
            getTotalDonationsById(animalId),
        ]
    );

    let isOwner = false;                             // by default it's false
    let hasNotDonated
    if (loggedInUser) {
        isOwner = pet._ownerId == loggedInUser.id                                               // true / false
        hasNotDonated = await checkUserDonationStatus(animalId, loggedInUser.id) === 0         // if true the user has ALREADY donated for this pet yet
    };

    ctx.render(detailsTemplate
        (
        pet, isOwner, loggedInUser,
        Number(numOfDonations) * 100, // number of donations multiplied by 100
        hasNotDonated
        )
        );
}
