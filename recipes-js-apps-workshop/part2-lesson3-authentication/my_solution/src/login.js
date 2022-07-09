document.querySelector('form').addEventListener('submit', checkCredentials)

async function checkCredentials(event) {
    event.preventDefault()
    let logInFormData = new FormData(event.target)
    let email = logInFormData.get('email')
    let password = logInFormData.get('password')

    try {
        if (email == '' || password == '') {
            throw new Error('Why don\'cha fuck off?')
        }

        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
            let error = await response.json()
            throw new Error(error.message)
        }

        const success = await response.json()
        sessionStorage.setItem('accessToken', success.accessToken)

        window.location = '/index.html'
    }
    catch (error) {

    }
}