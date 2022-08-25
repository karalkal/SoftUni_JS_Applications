import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { checkApplicationStatus, getApplicationsById, getOfferById, postApplication } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (offer, loggedInUser, applications, hasNotApplied, submitApplication) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt=${offer.title} />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span>${offer.description}</span>
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span>${offer.requirements}</span>
                </div>
            </div>
            <p>Applications: <strong id="applications">${applications}</strong></p>
    
            ${loggedInUser

          ? html`
            <div id="action-buttons">
                ${loggedInUser.id === offer._ownerId
                ? html`
                <!--Edit and Delete are only for creator-->
                <a href="/update/${offer._id}" id="edit-btn">Edit</a>
                <a href="/delete/${offer._id}" id="delete-btn">Delete</a>
                `
                : html`
                ${hasNotApplied
                    ? html`
                    <!--Bonus - Only for logged-in users ( not authors )-->
                    <a @click=${submitApplication} href="javascript:void(0)" id="apply-btn">Apply</a>
                    `
                    : nothing
                    }
                    `
                    }`
            : nothing
            }
            </div>
        </div>
    </section>
        `

export async function detailsView(ctx) {
    let offerId = ctx.params.id;

    let [offer, applications] = await Promise.all([
        getOfferById(offerId),
        getApplicationsById(offerId),
    ]);

    let loggedInUser = await getUserData();
    let userId = null        // if loggedInUser === undefined/null
    if (loggedInUser) {
        userId = loggedInUser.id
    }

    let hasNotApplied = await checkApplicationStatus(offerId, userId) === 0        // true / false

    ctx.render(detailsTemplate(offer, loggedInUser, applications, hasNotApplied, submitApplication));


    async function submitApplication() { 
        await postApplication(
            {offerId}
            );

        ctx.page.redirect('/details/' + offerId)

        // applications = await getApplicationsById(offerId);
        // hasNotApplied = await checkApplicationStatus(offerId, userId) === 0        // true / false

        // ctx.render(detailsTemplate(offer, loggedInUser, applications, hasNotApplied, submitApplication));
    }
}
