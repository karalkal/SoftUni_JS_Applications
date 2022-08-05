import { deleteBook } from "../api/data.js";


export function viewDelete(ctx) {
    deleteBook(ctx.params.id);

    ctx.page.redirect('/');
}
