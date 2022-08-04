import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getDonationsById, getDonationStatus, getSingleById, makeDonation } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (item, loggedInUser, donationsForItem, userHasDonated, donate) => html`
    <section id="details-page">
        <h1 class="title">Post Details</h1>
    
        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src=${item.imageUrl} alt="Material Image" class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${item.title}</h2>
                    <p class="post-description">Description: ${item.description}</p>
                    <p class="post-address">Address: ${item.address}</p>
                    <p class="post-number">Phone number: ${item.phone}</p>
                    <p class="donate-Item">Donate Materials: ${donationsForItem}</p>
    
                    ${loggedInUser
                    ? html`
                    <!--Edit and Delete are only for creator-->
                    <div class="btns">
    
                        <!-- NOTE! - compare USER.ID-->
                        ${loggedInUser.id === item._ownerId
                        ? html`
                        <a href="/update/${item._id}" class="edit-btn btn">Edit</a>
                        <a href="/delete/${item._id}" class="delete-btn btn">Delete</a>
                        `
                        : displayIfNotDonated(userHasDonated, donate)
                }
                    </div>
                    `
                    : nothing
                    }
                </div>
            </div>
        </div>
    </section>
        `


function displayIfNotDonated(userHasDonated, donate) {
    if (userHasDonated) {
        return nothing
    } else {
        return html`
        <!--Bonus - Only for logged-in users ( not authors )-->
        <a @click=${donate} href="javascript:void(0)" class="donate-btn btn">Donate</a>
        `
    }
}


export async function detailsView(ctx) {
    let postId = ctx.params.id;
    let loggedInUser = getUserData();

    let item = await getSingleById(postId);
    let donationsForItem = await getDonationsById(postId);

    let userHasDonated = false       //default, otherwise will return error if we chack donations status with loggedInUser.id for guest user
    if (loggedInUser) {
        userHasDonated = await getDonationStatus(postId, loggedInUser.id) != 0; // true / false
    }

    ctx.render(detailsTemplate(item, loggedInUser, donationsForItem, userHasDonated, donate));


    async function donate() {
        await makeDonation({postId: postId})      // expects object AND IDENTIFIER MUST BE NAMED postId

        // ctx.page.redirect('/details/' + postId)           // if redirected Judge tests fail, locally it works perfect


        donationsForItem = await getDonationsById(postId);
        userHasDonated = await getDonationStatus(postId, loggedInUser.id) != 0; // true / false
        ctx.render(detailsTemplate(item, loggedInUser, donationsForItem, userHasDonated, donate));
    }
}
