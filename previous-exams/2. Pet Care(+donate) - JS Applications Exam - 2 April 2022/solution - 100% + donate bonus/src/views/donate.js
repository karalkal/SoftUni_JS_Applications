import { makeDonation } from "../api/data.js"

export async function donateAction(ctx) {
    let petId = ctx.params.id
    await makeDonation({ petId })     // expets object with the id of the animal
    ctx.page.redirect('/details/' + petId)
}