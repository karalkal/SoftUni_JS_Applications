function attachEvents() {
    const rootUrl = 'http://localhost:3030/jsonstore/phonebook'
    const loadBtn = document.getElementById("btnLoad")
    const createBtn = document.getElementById("btnCreate")
    let ul = document.getElementById('phonebook')

    loadBtn.addEventListener('click', displayAll)
    createBtn.addEventListener('click', createEntry)

    async function displayAll() {
        ul.innerHTML = ''
        let response = await fetch(rootUrl)
        let phones = await response.json()
        for (let ph of Object.values(phones)) {
            let li = document.createElement('li')
            li.textContent = `${ph.person}: ${ph.phone}`

            let delBtn = document.createElement('button')
            delBtn.textContent = 'Delete'
            delBtn.addEventListener('click', (event) =>
                deleteEntry(event, ph._id))

            li.appendChild(delBtn)
            ul.appendChild(li)
        }
    }


    async function deleteEntry(event, id) {
        await fetch(rootUrl + `/${id}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        })

        //the Phonebook should be automatically reloaded
        displayAll()

    }


    async function createEntry() {
        let personField = document.getElementById('person')
        let phoneField = document.getElementById('phone')
        let person = personField.value
        let phone = phoneField.value
        personField.value = ''
        phoneField.value = ''

        try {
            let response = await fetch(rootUrl, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    person,
                    phone,
                })
            })

            if (!response.ok) {
                let error = await response.json()
                throw new Error(error.message)
            }

            //the Phonebook should be automatically reloaded
            displayAll()
        }
        catch {
            alert(error.message)
        }

    }

}



attachEvents();