export { savePostInDB };

async function savePostInDB(event) {
    let formData = new FormData(event.target)

    let dataToSubmit = {
        'topic': formData.get('topicName'),
        'username': formData.get('username'),
        'content': formData.get('postText'),
        'date': Date()
    }

    try {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSubmit),
        })

        if (response.ok == false) {
            let err = await response.json()
            throw new Error(await err.message)
        }

    } catch (error) {
        alert(error.message)
    }
};

