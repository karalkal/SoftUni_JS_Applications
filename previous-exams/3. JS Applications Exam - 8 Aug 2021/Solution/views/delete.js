import page from '../node_modules/page/page.mjs'


export function deleteItem(ctx) {
    let delDialog = confirm('Do you really want to delete this record?')
    if (delDialog) {
        let itemId = ctx.params.id
        
        fetch(`http://localhost:3030/data/books/${itemId}`, {
            method: 'delete',
            headers: {
                'X-Authorization': localStorage.token,
            }
        })

        page.redirect('/')
    }
}