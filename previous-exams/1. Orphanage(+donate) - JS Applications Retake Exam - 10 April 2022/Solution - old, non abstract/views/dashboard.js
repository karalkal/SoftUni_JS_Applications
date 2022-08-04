import { html, render } from '../node_modules/lit-html/lit-html.js'

const container = document.querySelector('main#main-content')

export async function viewDashboard() {
    let allItems = await getAllItems()

    render(dashboardTemplate(allItems), container)
}

const dashboardTemplate = (allItems) => html`
    <section id="dashboard-page">
        <h1 class="title">All Posts</h1>
    
    
        <!-- Display a div with information about every post (if any)-->
        ${allItems.length > 0
 
        ? html`
        <div class="all-posts">
    
            ${allItems.map(item => html`
            <div class="post">
                <h2 class="post-title">${item.title}</h2>
                <img class="post-image" src=${item.imageUrl} alt="Material Image">
                <div class="btn-wrapper">
                    <a href="/details/${item._id}" class="details-btn btn">Details</a>
                </div>
            </div> `)}
        </div> `

        : html`
        <!-- Display an h1 if there are no posts -->
        <h1 class="title no-posts-title">No posts yet!</h1>
        `
        }
    </section>
    `


async function getAllItems() {
    try {
        let response = await fetch(`http://localhost:3030/data/posts?sortBy=_createdOn%20desc`)

        if (response.ok == false) {
            let err = response.json()
            throw new Error(err.message)
        }

        let allItems = await response.json()
        
        return allItems
        // return []        // test if server returns empty json

    } catch (error) {
        throw new Error(error.message)
    }
}
