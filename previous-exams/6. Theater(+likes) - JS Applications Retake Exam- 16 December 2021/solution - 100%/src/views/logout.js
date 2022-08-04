import { logout } from "../api/users.js";


export function logoutView(ctx) {

    logout();
    ctx.updateUserNav();
    ctx.page.redirect('/')
}
