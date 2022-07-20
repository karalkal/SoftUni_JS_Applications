const host = 'http://localhost:3030'


async function request(method, url, data) {
    let options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
        const token = user.accessToken;
        options.headers['X-Authorization'] = token;
    }

    try {
        const response = await fetch(host + url, options)
        if (response.ok == false) {
            if (response.status == 403) {       // if accessToken exists locally but server has been restarted
                localStorage.removeItem('user')
            }
            let error = await response.json()
            throw new Error(error.message)
        }

        if (response.status == 204) { // logging out for example returns undefined response
            return response
        }

        return response.json()

    } catch (error) {
        alert(error.message)
        throw error
    }
}

const get = request.bind(null, 'get')
const post = request.bind(null, 'post')
const put = request.bind(null, 'put')
const del = request.bind(null, 'delete')

export { get, post, put, del as delete }


