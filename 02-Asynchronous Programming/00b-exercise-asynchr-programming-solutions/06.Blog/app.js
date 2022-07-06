function attachEvents() {
    const loadBtn = document.getElementById('btnLoadPosts')
    const viewBtn = document.getElementById('btnViewPost')

    const postsField = document.getElementById('posts')

    let h1PostTitle = document.getElementById('post-title')
    let paragraphBody = document.getElementById('post-body')
    let ulComments = document.getElementById('post-comments')

    loadBtn.addEventListener('click', loadPosts)


    async function loadPosts() {
        postsField.innerHTML = ''
        try {
            let response = await fetch('http://localhost:3030/jsonstore/blog/posts')
            if (!response.ok) processError(response)

            let allPosts = await response.json()
            for (let [k, v] of Object.entries(allPosts)) {
                let option = document.createElement('option')
                option.value = ('value', k)
                // console.log(k === v.id)
                option.textContent = v.title

                postsField.appendChild(option)
            }

            viewBtn.addEventListener('click', () => {
                let searchedPostID = postsField.value
                fetch(`http://localhost:3030/jsonstore/blog/comments`)
                    .then(response => {
                        if (!response.ok) processError(response)
                        // else, i.e. ok
                        return response.json()
                    })
                    .then(data => {
                        let relatedComments = Object.values(data).filter(c => c.postId == searchedPostID)

                        displayPostAndComments(allPosts[searchedPostID], relatedComments)
                    })
                    .catch(error => processError(error))
            })
        } catch (error) {
            processError(error)
        }
    }


    function displayPostAndComments(post, relatedComments) {
        ulComments.innerHTML = ''
        h1PostTitle.textContent = post.title
        paragraphBody.textContent = post.body
        for (let cmnt of relatedComments) {
            let li = document.createElement('li')
            li.id = cmnt.id
            li.textContent = cmnt.text
            ulComments.appendChild(li)
        }
    }


    function processError(err) {
        alert(`${err.status} Error - ${err.statusText}`)
        throw new Error(`${err.status} Error - ${err.statusText}`)
    }

}

attachEvents();