function loadCommits() {
    let userName = document.getElementById('username').value
    let repo = document.getElementById('repo').value
    let ul = document.getElementById('commits')

    fetch(`https://api.github.com/repos/${userName}/${repo}/commits`)
        .then(response => {
            ul.innerHTML = ''
            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            return response.json()
        })
        .then(arr => {
            for (let el of arr) {
                let li = document.createElement('li')
                li.textContent = `${el.commit.author.name}: ${el.commit.message}`
                ul.appendChild(li)
            }
        })
        .catch(err => {
            let li = document.createElement('li')
            console.log(err)
            li.textContent = `Error: ${err.status} (${err.statusText})`
            ul.appendChild(li)
        })

}