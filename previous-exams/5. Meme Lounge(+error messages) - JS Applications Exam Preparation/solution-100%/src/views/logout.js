import { logout } from "../api/api.js";


export function viewLogout(ctx) {
    logout();
    ctx.updateUserNav();
    ctx.page.redirect('/')
}
