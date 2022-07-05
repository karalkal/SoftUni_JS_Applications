function solution() {
    main = document.getElementById('main')

    fetch('http://localhost:3030/jsonstore/advanced/articles/list')
        .then(response => {
            return response.json()
        })
        .then(data => {
            createDiv(data)
        })


    function createDiv(data) {
        for (let article of Object.values(data)) {

            let accordion = document.createElement('div')
            accordion.className = 'accordion'

            let head = document.createElement('div')
            head.className = 'head'
            let span = document.createElement('span')
            span.textContent = article.title
            let btnMoreLess = document.createElement('button')
            btnMoreLess.classList.add('button')
            btnMoreLess.id = "ee9823ab-c3e8-4a14-b998-8c22ec246bd3"
            btnMoreLess.textContent = 'More'
            head.appendChild(span)
            head.appendChild(btnMoreLess)

            accordion.appendChild(head)

            main.appendChild(accordion)

            let extra = document.createElement('div')
            extra.className = 'extra'

            btnMoreLess.addEventListener('click', (event) => {

                if (event.target.textContent === 'More') {
                    // it's not perfect that we send a request every single time, then recreate or delete the extra div... but only God is perfect
                    fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`)
                        .then(response => {
                            return response.json()
                        })
                        .then(thisArticle => {
                            extra.innerHTML = ''
                            let paragraph = document.createElement('p')

                            paragraph.textContent = thisArticle.content

                            extra.appendChild(paragraph)
                            accordion.appendChild(extra)

                            extra.style.display = 'block'
                            event.target.textContent = 'Less'
                        })
                }
                else if (event.target.textContent === 'Less') {
                    extra.remove()
                    event.target.textContent = 'More'
                }
            })
        }
    }
}


window.onload = solution();
