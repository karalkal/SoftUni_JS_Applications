import { html, render } from '../node_modules/lit-html/lit-html.js'

const container = document.querySelector('main#main-content')

export async function viewOwnDashboard() {
    let myItems = await getMyItems()

    render(dashboardTemplate(myItems), container)
}

const dashboardTemplate = (myItems) => html`
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>    
    <!-- Display a div with information about every post (if any)-->
    ${myItems.length > 0 
    ? html `
    <div class="my-posts">

        ${myItems.map(item => html `
        <div class="post">
            <h2 class="post-title">${item.title}</h2>
            <img class="post-image" src=${item.imageUrl} alt="Image of ${item.title}">
            <div class="btn-wrapper">
                <a href="/details/${item._id}" class="details-btn btn">Details</a>
            </div>
        </div> `)
        }
    </div> `     

    : html `
    <!-- Display an h1 if there are no posts -->
    <h1 class="title no-posts-title">You have no posts yet!</h1>
    `
    }
</section>
`



async function getMyItems() {
    try {
        let response = await fetch(`http://localhost:3030/data/posts?where=_ownerId%3D%22${localStorage.userID}%22&sortBy=_createdOn%20desc`)

        if (response.ok == false) {
            let err = response.json()
            throw new Error(err.message)
        }

        let myItems = await response.json()

        return myItems
        // return []        // test template with no items

    } catch (error) {
        throw new Error(error.message)
    }
}
