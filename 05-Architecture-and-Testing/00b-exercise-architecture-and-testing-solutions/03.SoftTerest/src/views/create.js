import { createIdea } from "../api/data.js"

const section = document.getElementById('createPage')
const form = section.querySelector('form')
form.addEventListener('submit', onSubmit)

let ctx = null

export function showCreate(context) {
    ctx = context
    context.showSection(section)
}


async function onSubmit(event) {
    event.preventDefault()
    let formData = new FormData(form)

    let title = formData.get('title')
    let description = formData.get('description')
    let img = formData.get('imageURL')

    console.log(title, description, img)

    await createIdea({
        title,
        description,
        img,
    })

    form.reset()

    ctx.goTo('/catalog')
}