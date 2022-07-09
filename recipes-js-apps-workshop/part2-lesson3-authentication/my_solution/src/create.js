document.querySelector('form').addEventListener('submit', createRecipe);

async function createRecipe(event) {
    event.preventDefault();

    let token = sessionStorage.getItem('accessToken')

    if (!token) {
        alert('You need to register / login first!')
        window.location = '/login.html'
    }

    let recipeData = new FormData(event.target);

    let name = recipeData.get("name").trim();
    let img = recipeData.get("img").trim();
    let ingredients = recipeData.get("ingredients").trim().split('\n');
    let steps = recipeData.get("steps").trim().split('\n');

    try {
        let response = await fetch('http://localhost:3030/data/recipes', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": token
            },
            body: JSON.stringify({
                name,
                img,
                ingredients,
                steps,
            })
        })

        if (!response.ok) {
            let error = await response.json()
            throw new Error(error.message)
        }

        window.location = '/index.html'

    } catch (error) {
        alert(error.message)


    }


}