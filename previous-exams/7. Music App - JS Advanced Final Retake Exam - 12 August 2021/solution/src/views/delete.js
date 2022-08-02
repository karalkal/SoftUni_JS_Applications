import { deleteAlbum } from "../api/data.js";


export async function deleteView(ctx) {

    const choice = confirm('Are you sure you want to delete this entry?')

    if (choice) {
        await deleteAlbum(ctx.params.id);

        ctx.page.redirect('/');
    }
}
