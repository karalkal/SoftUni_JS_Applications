import { showPostDetails } from "./details.js";
import { savePostInDB } from "./save-post.js";

const homeSection = document.getElementById("homeView");
const detailsSection = document.getElementById("detailsView");


displayHome() // on load...
//... or when home anchor/button is pressed
document.querySelector('nav ul li a').addEventListener('click', displayHome)


const form = document.querySelector('div.new-topic-border form')
const allFormFields = document.querySelectorAll('div.new-topic-border form input, div.new-topic-border form textarea')
const allTopicFields = document.querySelector('div.topic-title')

const cancelButton = document.querySelector('button.cancel')
const publicButton = document.querySelector('button.public')
publicButton.type = "submit"

cancelButton.addEventListener('click', (event) => {
    event.preventDefault()
    allFormFields.forEach(fld => fld.value = "")  // clear each field
})

form.addEventListener('submit', (event) => {
    allFormFields.forEach(element => {
        event.preventDefault()
        if (element.value == '') {              // check for zero values
            alert('Some fields have been left empty!')
            throw new Error('Some fields have been left empty!')
        }
    })

    savePostInDB(event)

    allFormFields.forEach(fld => fld.value = "")  // clear each field

    displayPostsPreviewSection()
})

// check if clicked on specific post's anchor or h2, if yes => display details 
document.querySelector('div.topic-title').addEventListener('click', (ev) => {
    ev.preventDefault()

    if (ev.target.tagName === 'A' || ev.target.tagName === 'H2') {

        showPostDetails(ev.target.id)
    }
})

function displayHome() {
    homeSection.style.display = 'block';
    detailsSection.style.display = 'none';
    displayPostsPreviewSection();
}

async function displayPostsPreviewSection() {
    try {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`)
        if (response.ok == false) {
            let error = response.json()
            throw new Error(error.message)
        }

        let data = await response.json()
        createPostsPreview(data)

    } catch (error) {
        alert(error.message)
    }
}


function createPostsPreview(data) {
    allTopicFields.innerHTML = ''

    for (let [key, { topic, username, date }] of Object.entries(data)) {
        let divContainer = document.createElement('div')
        divContainer.className = "topic-container"
        let divWrapper = document.createElement('div')
        divWrapper.className = "topic-name-wrapper"
        let divTopicName = document.createElement('div')
        divTopicName.className = "topic-name"

        let a = document.createElement('a')
        a.id = key
        a.href = "#"
        a.className = "normal"
        let h2 = document.createElement('h2')
        h2.id = key
        h2.textContent = topic
        a.appendChild(h2)

        let divColumns = document.createElement('div')
        divColumns.className = "columns"

        let divInner = document.createElement('div')

        let pDate = document.createElement('p')
        pDate.textContent = 'Date: '
        let time = document.createElement('time')
        time.textContent = date
        pDate.appendChild(time)

        let divNickname = document.createElement('div')
        divNickname.className = "nick-name"
        let pUsername = document.createElement('p')
        pUsername.innerHTML = `Username: <span>${username}</span>`
        divNickname.appendChild(pUsername)

        divInner.appendChild(pDate)
        divInner.appendChild(divNickname)

        divColumns.appendChild(divInner)

        divTopicName.appendChild(a)
        divTopicName.appendChild(divColumns)

        divWrapper.appendChild(divTopicName)
        divContainer.appendChild(divWrapper)

        allTopicFields.appendChild(divContainer)
    }
}

