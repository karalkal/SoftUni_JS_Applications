function attachEvents() {
    const rootUrl = 'http://localhost:3030/jsonstore/messenger';
    const messagesArea = document.getElementById('messages');

    document.getElementById('refresh').addEventListener('click', refreshMessages);
    document.getElementById('submit').addEventListener('click', addMessage);

    function refreshMessages() {
        let allMessages = [];
        fetch(rootUrl)
            .then(response => response.json())
            .then(data => {
                Object.values(data)
                    .map(val => allMessages.push(`${val.author}: ${val.content}`));
                messagesArea.value = allMessages.join('\n')
            })
    }

    function addMessage() {
        let posterNameField = document.querySelector('input[name="author"]')
        let postContentField = document.querySelector('input[name="content"]')
        fetch(rootUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author: posterNameField.value,
                content: postContentField.value,
            })
        })
            .then(response => {
                if (!response.ok) {
                    let error = response.message
                    throw new Error(error)
                }

                posterNameField.value = ''
                postContentField.value = ''
                return response.json()
            }
            )
    }
}

attachEvents();