import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { checkLikeStatus, getLikesForTheatre, getTheatreById, likeTheatre } from "../api/data.js";
import { getUserData } from "../util.js";

const detailsTemplate = (submitVote, theatre, loggedInUser, isOwner, likes, hasNotVoted) => html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${theatre.title}</h1>
                <div>
                    <img src=${theatre.imageUrl} />
                </div>
            </div>
    
            <div class="details">
                <h3>Theater Description</h3>
                <p>${theatre.description}</p>
                <h4>Date: ${theatre.date}</h4>
                <h4>Author: ${theatre.author}</h4>

                ${loggedInUser
                ? displayButtons(submitVote, isOwner, theatre._id, hasNotVoted)
                : nothing
                }
                
                <p class="likes">Likes: ${likes}</p>
            </div>
        </div>
    </section>
        `


const displayButtons = (submitVote, isOwner, theatreId, hasNotVoted) => html`
<div class="buttons">
    ${isOwner 
        ? html`
        <a class="btn-delete" href="/delete/${theatreId}">Delete</a>
        <a class="btn-edit" href="/update/${theatreId}">Edit</a>
        `
        : displayLikeBtn(submitVote, isOwner, hasNotVoted)
        }
</div>
` 


const displayLikeBtn = (submitVote, isOwner, hasNotVoted) => {
// console.log(hasNotVoted)
    if (!isOwner && hasNotVoted) 
    return html ` 
        <!-- logged in users can see Like btn, but not the owner -->
        <a @click =${submitVote} class="btn-like" href="#">Like</a>
        `
}


export async function detailsView(ctx) {
    let loggedInUser = await getUserData()

    let theaterId = ctx.params.id

    let [theatre, likes, votingStatus] = await Promise.all(
        [
        getTheatreById(theaterId),
        getLikesForTheatre(theaterId),
        checkLikeStatus(theaterId, loggedInUser.id)
    ]);
   
    let isOwner = false;                             // by default it's false

    if (loggedInUser) {
        isOwner = theatre._ownerId == loggedInUser.id  // true / false
    }

    let hasNotVoted = votingStatus === 0

    ctx.render(detailsTemplate(submitVote, theatre, loggedInUser, isOwner, likes, hasNotVoted));  


    async function submitVote(event) {      // submit vote is declared and passed to template here so we can get all data for request and submit
        // event.preventDefault()
        await likeTheatre({theaterId}) // pass it is obj, need to use THIS SPEsLLING

        // ctx.page.redirect(s'/details/' + theaterId)

    }
}


