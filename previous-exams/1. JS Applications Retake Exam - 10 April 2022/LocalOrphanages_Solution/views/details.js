import { html, render, nothing } from '../node_modules/lit-html/lit-html.js'
import { until } from '../node_modules/lit-html/directives/until.js';


const container = document.querySelector('main#main-content')

export async function viewDetails(ctx) {
    let itemId = ctx.params.id
    let item = await getItemData(itemId)

    // console.log(item)

    render(detailsTemplate(item), container)
}


/*
_createdOn: 1617194295474​
_id: "126777f5-3277-42ad-b874-76d043b069cb"​
_ownerId: "847ec027-f659-4086-8032-5173e2f9c93a"​
address: "ul. Manioka Tapioka 25"​
description: "We need 20 striped notebooks and 10 squared notebooks, 5 backpacks, and other school supplies, such as pens, pencils, rulers, erasers, etc."
 imageUrl: "/images/school-supplies.jpeg"​
phone: "0888264871"​
title: "School Supplies"
*/


const detailsTemplate = (item) => html`
    <section id="details-page">
        <h1 class="title">Post Details</h1>
    
        <div id="container">
            <div id="details">
                <div class="image-wrapper">
                    <img src=${item.imageUrl} alt=${item.title} class="post-image">
                </div>
                <div class="info">
                    <h2 class="title post-title">${item.title}</h2>
                    <p class="post-description">Description: ${item.description}</p>
                    <p class="post-address">Address: ${item.address}</p>
                    <p class="post-number">Phone number: ${item.phone}</p>
                    <p class="donate-Item">Donate Materials: 0</p>
                    <div class="btns"></div>
    
                    <!--Edit and Delete are only for creator-->
                    ${item._ownerId === localStorage.getItem('userID')
                    ? html `
                        <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                        <a href="/delete/${item._id}" class="delete-btn btn">Delete</a>`
                    : nothing
                            }

                    <!-- Bonus - Only for logged -in users(not authors) -->
                    ${localStorage.getItem('userID')
                    ? html `
                            <a href="#" class="donate-btn btn">Donate</a>`
                    : nothing
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
    `


async function getItemData(itemId) {
    try {
        let response = await fetch(`http://localhost:3030/data/posts/${itemId}`)

        if (response.ok == false) {
            let err = response.json()
            throw new Error(err.message)
        }

        let itemData = await response.json()

        return itemData

    } catch (error) {
        throw new Error(error.message)
    }
}
