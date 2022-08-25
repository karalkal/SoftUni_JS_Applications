import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getOfferById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (offer, loggedInUser) => html`
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
            <p>Applications: <strong id="applications">1</strong></p>
    
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
                <!--Bonus - Only for logged-in users ( not authors )-->
                <a href="" id="apply-btn">Apply</a>
                `
                }`
            : nothing
            }
            </div>
        </div>
    </section>
        `

export async function detailsView(ctx) {
    let offer = await getOfferById(ctx.params.id);

    let loggedInUser = await getUserData()

    ctx.render(detailsTemplate(offer, loggedInUser));
}
