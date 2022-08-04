import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getGameById, getCommentsByGameId, createComment } from "../api/data.js";
import { getUserData } from "../util.js";

import page from "../../node_modules/page/page.mjs";

const detailsTemplate = (game, isOwner, comments, loggedInUser) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl} />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>    
            <p class="text">${game.summary} </p>

            <div class="details-comments">
                    <h2>Comments:</h2>
    
            ${showAllComments(comments)}             

            ${isOwner 
            ? html `
            <!-- Edit/Delete buttons ( Only for creator of this game )  -->
            <div class="buttons">
                <a href="/update/${game._id}" class="button">Edit</a>
                <a href="/delete/${game._id}" class="button">Delete</a>
            </div>
            `
            : nothing
            }
            </div>
        </div>

        ${loggedInUser 
        ? showCommentForm(isOwner, game._id)
        : nothing}        
        `

// bonus 
const showAllComments = (comments) =>  html`
        <!-- Bonus ( for Guests and Users ) -->
    ${comments.length > 0
    ? html `
    <ul>
        ${comments.map( c => html `
        <!-- list all comments for current game (If any) -->
        <li class="comment">
            <p>Content: ${c.comment}</p>
        </li>
        `)}
    </ul>
    `
    : html `
    <div class="details-comments">
        <h2>Comments:</h2>        
        <p class="no-comment">No comments.</p>
    </div>
    `
    }`

const showCommentForm = (isOwner, gameId) => html`
    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    <!-- done in the most idiotic way but should work -->
    <article class="create-comment">
        <label>Add new comment:</label>
    ${isOwner 
    ? html  `
    <form class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
    </article>
    `
    : html  `
    <form @submit=${postComment} class="form">
        <!-- will send the id from the form -->
        <input type="hidden" name="gameId" readonly value=${gameId}> 

        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
    `}
    </article>`



export async function detailsView(ctx) {
    let gameId = ctx.params.id;
    let game = await getGameById(gameId);

    let comments = await getCommentsByGameId(gameId)

    let loggedInUser = await getUserData()

    let isOwner = false                             // by default it's false
    
    if (loggedInUser) {
        isOwner = game._ownerId == loggedInUser.id  // true / false
        // console.log(game._ownerId, loggedInUser.id ) 
    }

    ctx.render(detailsTemplate(game, isOwner, comments, loggedInUser));
}


export async function postComment(event) {
    console.log(event)

    event.preventDefault();

    let commentBody = new FormData(event.target).get('comment')
    let gameId = new FormData(event.target).get('gameId')
    event.target.reset()

    if (commentBody == '') {
        return alert('Please fill all requred fields')
    }

    createComment({gameId, comment: commentBody})

    page.redirect(`/details/${gameId}`)
}