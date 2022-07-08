async function loadRecipes() {

    let main = document.querySelector('main')
    try {
        let response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes')
        if (!response.ok) {
            let error = await response.json()
            throw new Error(error.message)
        }

        main.innerHTML = ''

        let recipes = await response.json()

        for (let currentRecipe of Object.values(recipes)) {
            let articlePreview = document.createElement('article')
            articlePreview.className = 'preview'

            let divTitle = document.createElement('div')
            divTitle.className = 'title'
            let h2Title1 = document.createElement('h2')
            h2Title1.innerHTML = currentRecipe.name
            divTitle.appendChild(h2Title1)

            let divSmall = document.createElement('div')
            divSmall.className = 'small'
            let imgPre = document.createElement('img')
            imgPre.src = currentRecipe.img
            divSmall.appendChild(imgPre)

            articlePreview.appendChild(divTitle)
            articlePreview.appendChild(divSmall)
            main.appendChild(articlePreview)

            let recipeID = currentRecipe._id


            articlePreview.addEventListener('click', async () => {
                // each time check if article alredy exists, if yes, remove it in order to create a new one
                let articleDetails = document.getElementById('details')
                if (articleDetails) {
                    articleDetails.remove()
                }

                articleDetails = document.createElement('article')
                articleDetails.id = 'details'

                let response = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${recipeID}`)
                let recipeData = await response.json()

                let h2Title2 = document.createElement('h2')
                h2Title2.innerHTML = recipeData.name
                articleDetails.appendChild(h2Title2)

                let divBand = document.createElement('div')
                divBand.classList.add('band')

                let divThumb = document.createElement('div')
                divThumb.classList.add('thumb')
                let imgDetails = document.createElement('img')
                imgDetails.src = recipeData.img
                divThumb.appendChild(imgDetails)

                divBand.appendChild(divThumb)

                let divIngr = document.createElement('div')
                divIngr.classList.add('ingredients')
                let h3ing = document.createElement('h3')
                h3ing.textContent = 'Ingredients:'
                divIngr.appendChild(h3ing)

                let ingrList = document.createElement('ul')
                recipeData.ingredients.forEach(r => {
                    let li = document.createElement('li')
                    li.textContent = r
                    ingrList.appendChild(li)
                })

                divIngr.appendChild(ingrList)

                divBand.appendChild(divIngr)

                articleDetails.appendChild(divBand)

                let divDescr = document.createElement('div')
                divDescr.className = "description"
                let h3prep = document.createElement('h3')
                h3prep.textContent = 'Preparation:'
                divDescr.appendChild(h3prep)

                recipeData.steps.forEach(r => {
                    let p = document.createElement('p')
                    p.innerHTML = r
                    divDescr.appendChild(p)
                })

                articleDetails.appendChild(divDescr)

                main.appendChild(articleDetails)

            })
        }
    }
    catch (error) {
        alert(error.message)

    }

}


document.addEventListener('DOMContentLoaded', loadRecipes)