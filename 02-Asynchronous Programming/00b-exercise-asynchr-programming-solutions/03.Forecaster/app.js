function attachEvents() {
    const location = document.getElementById('location')
    const forecastContainer = document.getElementById('forecast')
    const divCurrent = document.getElementById('current')
    const divUpcoming = document.getElementById('upcoming')
    document.getElementById('submit').addEventListener('click', getWeather)


    function getWeather(e) {
        e.preventDefault()

        divCurrent.innerHTML = `<div class="label">Current conditions</div>`
        divUpcoming.innerHTML = ` <div class="label">Three-day forecast</div>`

        // TODAY
        fetch(`http://localhost:3030/jsonstore/forecaster/today/${location.value}`)
            .then(response => {
                if (response.status !== 200) {
                    displayError()
                }
                return response.json()
            })
            .then(data => {
                constructCurrentDiv(data)
            })

        // NEXT
        fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${location.value}`)
            .then(response => {
                if (response.status !== 200) {
                    displayError()
                }
                return response.json()
            })
            .then(data => {
                constructNextDiv(data)
            })
    }


    function constructCurrentDiv(data) {
        let forecasts = document.createElement('div')
        forecasts.classList.add('forecasts')

        let symbolSpan = document.createElement('span')
        symbolSpan.classList.add('condition', 'symbol')
        if (data.forecast.condition === 'Sunny') {
            symbolSpan.textContent = '☀' //`&#x2600;` // ☀
        } else if (data.forecast.condition === 'Partly sunny') {
            symbolSpan.textContent = '⛅' //`&#x26C5;` // ⛅
        } else if (data.forecast.condition === 'Overcast') {
            symbolSpan.textContent = `☁` //`&#x2601;` // ☁
        } else if (data.forecast.condition === 'Rain') {
            symbolSpan.textContent = '☂' // `&#x2614;` // ☂
        } else {
            displayError()
        }

        let conditionSpan = document.createElement('span')
        conditionSpan.classList.add('condition')
        let citySpan = document.createElement('span')
        citySpan.classList.add('forecast-data')
        citySpan.textContent = data.name
        let degreesSpan = document.createElement('span')
        degreesSpan.classList.add('forecast-data')
        degreesSpan.textContent = data.forecast.low + '°' + '/' + data.forecast.high + '°'    // °
        let weatherTypeSpan = document.createElement('span')
        weatherTypeSpan.classList.add('condition')
        weatherTypeSpan.textContent = data.forecast.condition

        conditionSpan.appendChild(citySpan)
        conditionSpan.appendChild(degreesSpan)
        conditionSpan.appendChild(weatherTypeSpan)

        forecasts.appendChild(symbolSpan)
        forecasts.appendChild(conditionSpan)

        divCurrent.appendChild(forecasts)

        forecastContainer.style.display = 'block'
    }


    function constructNextDiv(data) {
        let forecastInfo = document.createElement('div')
        forecastInfo.classList.add('forecast-info')

        for (let day = 0; day < 3; day++) {

            let upcomingSpan = document.createElement('span')
            upcomingSpan.classList.add('upcoming')

            let symbolSpan = document.createElement('span')
            symbolSpan.classList.add('symbol')
            if (data.forecast[day].condition === 'Sunny') {
                symbolSpan.textContent = '☀' //`&#x2600;` // ☀
            } else if (data.forecast[day].condition === 'Partly sunny') {
                symbolSpan.textContent = '⛅' //`&#x26C5;` // ⛅
            } else if (data.forecast[day].condition === 'Overcast') {
                symbolSpan.textContent = `☁` //`&#x2601;` // ☁
            } else if (data.forecast[day].condition === 'Rain') {
                symbolSpan.textContent = '☂' // `&#x2614;` // ☂
            } else {
                displayError()
            }

            let degreesSpan = document.createElement('span')
            degreesSpan.classList.add('forecast-data')
            degreesSpan.textContent = data.forecast[day].low + '°' + '/' + data.forecast[day].high + '°'    // °

            let weatherTypeSpan = document.createElement('span')
            weatherTypeSpan.classList.add('condition')
            weatherTypeSpan.textContent = data.forecast[day].condition

            upcomingSpan.appendChild(symbolSpan)
            upcomingSpan.appendChild(degreesSpan)
            upcomingSpan.appendChild(weatherTypeSpan)
            divUpcoming.append(upcomingSpan)

            forecastContainer.style.display = 'block'
        }
    }


    function displayError() {
        forecastContainer.style.display = 'block'
        forecastContainer.textContent = 'Error'
        throw new Error('Error')
    }

}

attachEvents();