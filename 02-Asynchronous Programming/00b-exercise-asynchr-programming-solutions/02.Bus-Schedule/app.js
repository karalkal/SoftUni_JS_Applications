function solve() {
    let infoField = document.querySelector('span.info')
    let departBtn = document.getElementById('depart')
    let arriveBtn = document.getElementById('arrive')

    let nextStopID = 'depot'

    // departBtn.addEventListener('click', depart)
    // arriveBtn.addEventListener('click', arrive)

    function depart() {
        departBtn.disabled = true
        arriveBtn.disabled = false

        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopID}`)
            .then(response => {

                if (response.status !== 200) {
                    departBtn.disabled = true
                    arriveBtn.disabled = true
                    infoField.textContent = 'Error'
                    throw new Error('no data')
                }

                return response.json()
            })
            .then(data => {
                infoField.textContent = `Next stop ${data.name}`
            })
    }


    function arrive() {
        departBtn.disabled = false
        arriveBtn.disabled = true

        fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopID}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                infoField.textContent = `Arriving at ${data.name}`
                nextStopID = data.next
            })
    }

    return {
        depart,
        arrive
    };
}

let result = solve();