import page from '../node_modules/page/page.mjs'


export function deleteItem(ctx) {
    let delDialog = confirm('Do you really want to delete this record?')
    if (delDialog) {
        let itemId = ctx.params.id
        /*
        // just in case
        let response = await fetch(`http://localhost:3030/data/posts/${itemId}`)
        let item = await response.json()    
        if (item._ownerId === localStorage.getItem('userID'))  {    
        }
        */
        fetch(`http://localhost:3030/data/posts/${itemId}`, {
            method: 'delete',
            headers: {
                'X-Authorization': localStorage.token,
            }
        })

        page.redirect('/')
    }
}