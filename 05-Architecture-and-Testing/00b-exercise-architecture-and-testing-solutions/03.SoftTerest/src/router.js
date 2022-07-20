export function initialize(links) {
    const main = document.querySelector('main')
    const nav = document.querySelector('nav')
    nav.addEventListener('click', onNavigate)


    const context = {
        showSection,
        goTo,
        updateNav,
    }

    return context

    function showSection(section) {
        main.replaceChildren(section)
    }

    function onNavigate(event) {
        let target = event.target
        if (target.tagName == 'IMG') {// IMG for home link is embedded in A
            target = target.parentElement
        }

        if (target.tagName == 'A') {
            event.preventDefault()

            let fullUrl = new URL(target.href)
            goTo(fullUrl.pathname)
        }
    }

    function goTo(linkName, ...params) {
        const handler = links[linkName]
        if (typeof handler == 'function') {
            handler(context, ...params)        // pass context to functions showHome, showLogin etc.
        }
    }

    function updateNav() {
        const user = localStorage.getItem('user')
        if (user) {
            nav.querySelectorAll('.user').forEach(element => element.style.display = 'block')
            nav.querySelectorAll('.guest').forEach(element => element.style.display = 'none')
        } else {
            nav.querySelectorAll('.user').forEach(element => element.style.display = 'none')
            nav.querySelectorAll('.guest').forEach(element => element.style.display = 'block')

        }
    }
}


