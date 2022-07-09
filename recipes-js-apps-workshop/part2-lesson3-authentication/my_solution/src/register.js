const form = document.querySelector('form');
form.addEventListener('submit', register)


async function register(event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    let email = formData.get('email');
    let password1 = formData.get('password');
    let password2 = formData.get('rePass');

    try {
        if (email == '' || password1 == '') {
            throw new Error('All fields are required!')
        }
        if (password1 !== password2) {
            throw new Error('Password entries do not match!')
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                "password": password1,
            })
        });

        if (!response.ok) {
            let error = await response.json()
            throw new Error(error.message)
        }

        let respData = await response.json()

        sessionStorage.setItem('accessToken', respData.accessToken)

        window.location = '/index.html'

    } catch (error) {
        alert(error.message)
    }
}