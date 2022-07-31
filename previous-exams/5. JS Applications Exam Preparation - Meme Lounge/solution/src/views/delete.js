import { deleteMeme } from "../api/data.js";


export function viewDelete(ctx) {
    deleteMeme(ctx.params.id);

    ctx.page.redirect('/');
}
