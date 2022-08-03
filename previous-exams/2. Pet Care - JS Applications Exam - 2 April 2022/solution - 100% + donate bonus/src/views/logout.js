import { logout } from "../api/users.js";


export function logoutView(ctx) {

    console.log('LOGOUT')
    logout();
    ctx.updateUserNav();
    ctx.page.redirect('/')
}
