import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getSingleById } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (item, loggedInUser) => html`
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
                    <p class="donate-Item">Donate Materials: 0</p>
    
                    ${loggedInUser
        ? html`
                    <!--Edit and Delete are only for creator-->
                    <div class="btns">
                        
                        ${loggedInUser.id === item._ownerId
                        ? html `
                        <a href="/update/${item._id}" class="edit-btn btn">Edit</a>
                        <a href="/delete/${item._id}" class="delete-btn btn">Delete</a>
                        `
                        : html `
                        <!--Bonus - Only for logged-in users ( not authors )-->
                        <a href="donate/${item._id}" class="donate-btn btn">Donate</a>
                        `
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

export async function detailsView(ctx) {
    let item = await getSingleById(ctx.params.id);

    let loggedInUser = await getUserData()

    let isOwner = false                             // by default it's false

    if (loggedInUser) {
        isOwner = item._ownerId == loggedInUser.id  // true / false
    }

    ctx.render(detailsTemplate(item, loggedInUser));
}
