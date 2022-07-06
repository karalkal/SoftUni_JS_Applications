function lockedProfile() {
    const main = document.getElementById('main')
    main.replaceChildren()  // clear it
    let usersCount = 1

    fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            for (let person in data) {

                // adding the button directly in innerHTML =>  does not preserve dynamically added listeners. 
                let profileEl = document.createElement('div')
                profileEl.className = 'profile'

                let img = document.createElement('img')
                img.src = "./iconProfile2.png"
                img.className = "userIcon"
                profileEl.appendChild(img)

                let labelLock = document.createElement('label')
                labelLock.textContent = 'Lock'
                profileEl.appendChild(labelLock)

                let lockRadioBtn = document.createElement('input')
                lockRadioBtn.type = "radio"
                lockRadioBtn.name = `user${usersCount}Locked`
                lockRadioBtn.value = "lock"
                lockRadioBtn.setAttribute('checked', '')
                profileEl.appendChild(lockRadioBtn)

                let labelUnlock = document.createElement('label')
                labelUnlock.textContent = 'Unlock'
                profileEl.appendChild(labelUnlock)

                let unlockRadioBtn = document.createElement('input')
                unlockRadioBtn.type = "radio"
                unlockRadioBtn.name = `user${usersCount}Locked`
                unlockRadioBtn.value = "unlock"
                profileEl.appendChild(unlockRadioBtn)

                let br = document.createElement('br')
                profileEl.appendChild(br)

                let hr1 = document.createElement('hr')
                profileEl.appendChild(hr1)

                let labelUsername = document.createElement('label')
                labelUsername.textContent = 'Username'
                profileEl.appendChild(labelUsername)

                let usernameInput = document.createElement('input')
                usernameInput.type = 'text'
                usernameInput.name = `user${usersCount}Username`
                usernameInput.setAttribute('value', `${data[person].username}`)
                usernameInput.disabled = true
                usernameInput.readOnly = true
                profileEl.appendChild(usernameInput)

                // details div starts
                let divUserData = document.createElement('div')
                divUserData.className = `user${usersCount}HiddenFields`
                divUserData.hidden = true

                let hr2 = document.createElement('hr')

                let labelEmail = document.createElement('label')
                labelEmail.textContent = 'Email:'

                let emailInput = document.createElement('input')
                emailInput.type = 'email'
                emailInput.name = `user${usersCount}Email`
                emailInput.setAttribute('value', `${data[person].email}`)
                emailInput.disabled = true
                emailInput.readOnly = true

                let labelAge = document.createElement('label')
                labelAge.textContent = 'Age:'

                let ageInput = document.createElement('input')
                ageInput.type = 'email'
                ageInput.name = `user${usersCount}Age`
                ageInput.setAttribute('value', `${data[person].age}`)
                ageInput.disabled = true
                ageInput.readOnly = true

                divUserData.appendChild(hr2)
                divUserData.appendChild(labelEmail)
                divUserData.appendChild(emailInput)
                divUserData.appendChild(labelAge)
                divUserData.appendChild(ageInput)

                profileEl.appendChild(divUserData)
                // details div appended

                let showBtn = document.createElement('button')
                showBtn.textContent = 'Show more'

                profileEl.appendChild(showBtn)

                main.appendChild(profileEl)

                usersCount++

            }

            document.querySelectorAll('button')
                .forEach(btn => {
                    btn.addEventListener('click', showMore)             // this works though...
                })
            document.querySelectorAll('input[type="radio"][value="lock"')
                .forEach(chckbx => {
                    chckbx.addEventListener('change', (event) => {
                        if (chckbx.checked) {
                            event.target.parentElement.children[10].textContent = 'Show more'
                            event.target.parentElement.children[9].hidden = true
                        }
                    })
                })

        })


    function showMore(event) {

        let isLocked = event.target.parentElement.children[2].checked
        if (isLocked) {
            return
        }

        event.target.parentElement.children[9].hidden = false

        if (event.target.textContent === "Show more") {
            event.target.textContent = 'Hide it'
        } else if (event.target.textContent === "Hide it") {
            event.target.textContent = 'Show more'
            event.target.parentElement.children[9].hidden = true
        }

    }

}