function getInfo() {
    let stopId = document.getElementById('stopId').value;
    let stopNameField = document.getElementById('stopName');
    let ulField = document.getElementById('buses');

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`)
        .then(response => {
            if (!response.ok) {
                ulField.innerHTML = ''
                stopNameField.textContent = 'Error'
                return
            }
            return response.json()
        })
        .then(data => {
            ulField.innerHTML = ''

            stopNameField.textContent = data.name;
            for (let [bus, time] of Object.entries(data.buses)) {
                // console.log(bus, time)
                let liEl = document.createElement('li')
                liEl.textContent = `Bus ${bus} arrives in ${time} minutes`
                ulField.appendChild(liEl)
            }
        })
        .catch(err => {
            ulField.innerHTML = ''
            stopNameField.textContent = 'Error'
        })
}