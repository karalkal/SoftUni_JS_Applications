import { deleteCar } from "../api/data.js";


export async function deleteView(ctx) {

    const choice = confirm('Are you sure you want to delete this entry?')

    if (choice) {
        await deleteCar(ctx.params.id)

        ctx.page.redirect('/catalog');
    }
}
