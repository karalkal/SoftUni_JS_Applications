import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllBooks, getBookById, getLikesById, getLikeStatus, likeBook } from "../api/data.js";

const detailsTemplate = (book, loggedInUserId, likes, hasNotVoted, postLike) => {
// console.log(loggedInUserId, book._ownerId)
return html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
    
                ${loggedInUserId == book._ownerId
           ? html`
                <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                <a class="button" href="/update/${book._id}">Edit</a>
                <a class="button" href="/delete/${book._id}">Delete</a>
                `
            : nothing 
                }

             <!-- 1. check if owner, 2. logged in will be undefined for guest, will pass 1, 3. if false, don't display -->
                ${loggedInUserId != book._ownerId  && loggedInUserId && hasNotVoted
            ? html `
                <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
                <a @click=${postLike} class="button" href="javascript:void(0)">Like</a>                
                `
            : nothing
                 } 
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>                
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
    `}


export async function viewDetails(ctx) {
    let bookId = ctx.params.id;

    let loggedInUserId;         // will remain undefined if nothing in localStorage

    let hasNotVoted = false     // default, will include guests as well

    if (localStorage.userData) {
        loggedInUserId = JSON.parse(localStorage.userData).id
        hasNotVoted = await getLikeStatus(bookId, loggedInUserId) === 0      // if response == 0 user has not liked it yet  
    }

    let [singleBook, bookLikes] = await Promise.all([
        getBookById(bookId),
        getLikesById(bookId)
    ]);
    ctx.render(detailsTemplate(singleBook, loggedInUserId, bookLikes, hasNotVoted, postLike));

    async function postLike() {       //api expects obj { bookId }
        await likeBook( {
            bookId
          } )

        //   let [bookLikes, hasNotVoted] = await Promise.all([
        //     getLikesById(bookId),
        //     getLikesById(bookId, loggedInUserId) === 0        
        // ]);

        // console.log(bookId, lo)
        // ctx.render(detailsTemplate(singleBook, loggedInUserId, bookLikes, hasNotVoted, postLike));
        
        ctx.page.redirect('/details/' + bookId)        //does not pass tests
    }

}