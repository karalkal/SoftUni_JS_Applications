import { deleteMeme } from "../api/data.js";


export async function viewDelete(ctx) {

    const choice = confirm('Are you sure you want to delete this entry?')

    if (choice) {
        await deleteMeme(ctx.params.id);

        ctx.page.redirect('/');
    }
}
