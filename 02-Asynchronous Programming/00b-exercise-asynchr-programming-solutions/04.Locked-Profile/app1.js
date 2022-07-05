function lockedProfile() {
    const main = document.getElementById('main')
    main.replaceChildren()  // clear it

    fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            for (let person in data) {
                main.innerHTML += `
                <div class="profile">
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock">
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="${data[person].username}" disabled readonly />
				<div class="user1Username" hidden>
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="${data[person].email}" disabled readonly />
					<label>Age:</label>
					<input type="text" name="user1Age" value="${data[person].age}" disabled readonly />
				</div>

                <button>Show more</button>
			</div>
                `       // adding the button directly in innerHTML =>  does not preserve dynamically added listeners. 
            }

            document.querySelectorAll('button')
                .forEach(btn => {
                    btn.addEventListener('click', showMore)             // this works though...
                })

            document.querySelectorAll('input[type="radio"][value="lock"')
                .forEach((chckbx, index) => {
                    chckbx.name = `user${index}Locked}`

                    chckbx.addEventListener('change', (event) => {
                        if (chckbx.checked) {
                            event.target.parentElement.children[9].hidden = true                // hide additional info
                            event.target.parentElement.children[10].textContent = 'Show more'   // the button
                        }
                    })
                })

            document.querySelectorAll('input[type="radio"][value="unlock"')
                .forEach((chckbx, index) => {
                    chckbx.name = `user${index}Locked}`
                    chckbx.checked = true


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